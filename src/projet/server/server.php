<?php

require_once 'workers/connectionConfig.php';
require_once 'workers/DBConnection.php';
require_once 'workers/LoginBDManager.php';
require_once 'workers/MatchBDManager.php';
require_once 'workers/PlayerBDManager.php';
require_once 'workers/ReceBDManager.php';
require_once 'workers/AngriffBDManager.php';

require_once 'loginManager.php';
require_once 'matchManager.php';
require_once 'playerManager.php';
require_once 'receManager.php';
require_once 'AngriffManager.php';

require_once 'beans/Login.php';
require_once 'beans/Match.php';
require_once 'beans/Player.php';
require_once 'beans/Rece.php';
require_once 'beans/Angriff.php';

session_start();


function sendXMLResponse($success, $message = '', $data = null) {
    header('Content-Type: text/xml; charset=UTF-8');
    echo "<?xml version='1.0' encoding='UTF-8'?>\n";
    echo "<response>\n";
    echo "  <success>" . ($success ? 'true' : 'false') . "</success>\n";
    if ($message) {
        echo "  <message>" . htmlspecialchars($message, ENT_XML1, 'UTF-8') . "</message>\n";
    }
    if ($data) {
        foreach ($data as $key => $items) {
            foreach ($items as $item) {
                echo $item->toXML();
            }
        }
    }
    echo "</response>";
    exit;
}






// Consistent session handling functions
function isLoggedIn() {
    return isset($_SESSION['login_id']);

}

function isAdmin() {
    return isset($_SESSION['login_id']) && isset($_SESSION['role']) && $_SESSION['role'] === 'Admin';
}

function login($login) {
    $_SESSION['login_id'] = $login->getPkLogin();
    $_SESSION['username'] = $login->getUsername();
    $_SESSION['role'] = $login->getRole();
}

function logout() {
    session_unset();
    session_destroy();
}

// Initialize managers
$loginManager = new LoginManager();
$matchManager = new MatchManager();
$playerManager = new PlayerManager();
$receManager = new ReceManager();
$angriffManager = new AngriffManager();


// Handle different HTTP methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $action = $_POST['action'] ?? '';
        
        switch($action) {
            case 'login':
                $username = $_POST['username'] ?? '';
                $password = $_POST['password'] ?? '';

                //$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                
                $login = $loginManager->checkCredentials($username, $password);
                if ($login) {
                    login($login);
                    sendXMLResponse(true, 'Login successful', [
                        'isAdmin' => $login->getRole() === 'Admin' ? 'true' : 'false',
                        'username' => $login->getUsername(),
                        'role' => $login->getRole()
                    ]);
                    /*setcookie(
                        'LOGGED_USER'
                        $username,
                        [
                            'expires' => time() + 365*24*3600,
                            'secure' => true,
                            'httponly' => true,
                        ]

                    )*/
                } else {
                    sendXMLResponse(false, 'Invalid credentials');
                }
                break;

            case 'disconnect':
                logout();
                sendXMLResponse(true, 'Logout successful');
                break;

            default:
                sendXMLResponse(false, 'Invalid action');
                break;
        }
        break;

    case 'GET':
        $action = $_GET['action'] ?? '';
        
        switch($action) {
            case 'getMatchs':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }
                $matchs = $matchManager->getMatchs();
                sendXMLResponse(true, 'Matches retrieved', ['matchs' => $matchs]); // Sending response
                break;
            
            case 'getPlayers':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }
                $players = $playerManager->getPlayers();
                sendXMLResponse(true, 'Players retrieved', ['players' => $players]); // Sending response
                break;

                case 'getRece':
                    if (!isLoggedIn()) {
                        sendXMLResponse(false, 'Please log in first');
                        break;
                    }

                $matchId = $_GET['matchPk'] ?? '';
                $player = $_GET['playerPk'] ?? '';
                    
                
                    // Call database function
                    $rece = $receManager->getRece($matchId, $player);                
                    
                    if ($player == '' ) {
                        sendXMLResponse(false, 'player ID  cannot be empty');
                        break;
                    }if ($matchId == '') {
                        sendXMLResponse(false, 'match ID cannot be empty');
                        break;
                    }
                    sendXMLResponse(true, 'Reces retrieved', ['reces' => $rece]);
                    if (empty($rece)) {
                        sendXMLResponse(false, 'No rece data found');
                        break;
                    }       
                    
                    break;

                    case 'getAngriff':
                        if (!isLoggedIn()) {
                            sendXMLResponse(false, 'Please log in first');
                            break;
                        }
    
                    $matchId = $_GET['matchPk'] ?? '';
                    $player = $_GET['playerPk'] ?? '';
                        
                    
                        // Call database function
                        $angriff = $angriffManager->getAngriffs($matchId, $player);
                        
                        
                        if ($player == '' ) {
                            sendXMLResponse(false, 'player ID  cannot be empty');
                            break;
                        }else if ($matchId == '') {
                            sendXMLResponse(false, 'match ID cannot be empty');
                            break;
                        }
                        // Ensure there is data
                        sendXMLResponse(true, 'Angriffs retrieved', ['angriffs' => $angriff]);
    
                        if (empty($angriff)) {
                            sendXMLResponse(false, 'No rece data found');
                            break;
                        }    
                        break;
        }

    case 'PUT':
        if (!isLoggedIn()) {
            sendXMLResponse(false, 'Please log in first');
            break;
        }

        if (!isAdmin()) {
            sendXMLResponse(false, 'Administrator access required');
            break;
        }

        //=====================================ANGRIFF
        $putangriffData = file_get_contents("php://input");
        parse_str($putangriffData, $dataAngriff);
    
        if (empty($dataAngriff)) {
            sendXMLResponse(false, 'No data for Angriff received to update');
            break;
        }
    
        $pk_angriff = $dataAngriff['pk_angriff'] ?? '';
        $matchPkangriff = $dataAngriff['matchPk'] ?? '';
        $playerPkangriff = $dataAngriff['playerPk'] ?? '';
        $balleErhalten = $dataAngriff['balleErhalten'] ?? '';
        $punkte = $dataAngriff['punkte'] ?? '';
        $druckvoll = $dataAngriff['druckvoll'] ?? '';
        $zuEasy = $dataAngriff['zuEasy'] ?? '';
        $fehler = $dataAngriff['fehler'] ?? '';
        $blockPunkt = $dataAngriff['blockPunkt'] ?? '';
        $block = $dataAngriff['block'] ?? '';
        $ass = $dataAngriff['ass'] ?? '';
    
        if (empty($pk_angriff) || empty($matchPkangriff) || empty($playerPkangriff)) {
            sendXMLResponse(false, "Missing required parameters");
            break;
        }
    
        $resultangriff = $angriffManager->updateAngriffs(
            new Angriff(
                $pk_angriff, $matchPkangriff, $playerPkangriff,
                $balleErhalten, $punkte,
                $druckvoll, $zuEasy, $fehler,
                $blockPunkt, $block, $ass
            )
        );
    
        sendXMLResponse($resultangriff, $resultangriff ? "Angriff updated successfully" : "Failed to update Angriff");
        break;

        //=====================================RECE

        $putreceData = file_get_contents("php://input");
        parse_str($putreceData, $datarece);
    
        if (empty($datarece)) {
            sendXMLResponse(false, 'No data for rece received to update');
            break;
        }

        $pk_rece = $datarece['pk_rece'] ?? '';
        $playerPkrece = $datarece['playerPk'] ?? '';
        $matchPkrece = $datarece['matchPk'] ?? '';
        $perfekt = $datarece['perfekt'] ?? '';
        $superInZone = $datarece['superInZone'] ?? '';
        $neutral = $datarece['neutral'] ?? '';
        $schlecht = $datarece['schlecht'] ?? '';
        $direktFehler = $datarece['direktFehler'] ?? '';
        $falscheEntscheidung = $datarece['falscheEntscheidung'] ?? '';
    
        if (empty($pk_rece) || empty($matchPkrece) || empty($playerPkrece)) {
            sendXMLResponse(false, "Missing required parameters");
            break;
        }
    
        $resultrece = $receManager->updateReces(
            new Rece(
                $pk_rece, $playerPkrece, $matchPkrece,
                $perfekt, $superInZone,
                $neutral, $schlecht, $direktFehler,
                $falscheEntscheidung
            )
        );
    
        sendXMLResponse($resultrece, $resultrece ? "Rece updated successfully" : "Failed to update Rece");
        break;



    case 'DELETE':
        if (!isLoggedIn()) {
            sendXMLResponse(false, 'Please log in first');
            break;
        }

        if (!isAdmin()) {
            sendXMLResponse(false, 'Administrator access required');
            break;
        }
        break;

    default:
        sendXMLResponse(false, 'Invalid request method');
        break;
}
?>