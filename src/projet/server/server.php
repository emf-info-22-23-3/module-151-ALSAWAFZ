<?php

require_once 'workers/connectionConfig.php';
require_once 'workers/DBConnection.php';
require_once 'workers/LoginBDManager.php';
require_once 'workers/MatchBDManager.php';
require_once 'workers/PlayerBDManager.php';
//require_once 'workers/ReceBDManager.php';

require_once 'loginManager.php';
require_once 'matchManager.php';
require_once 'playerManager.php';
//require_once 'receManager.php';

require_once 'beans/Angriff.php';
require_once 'beans/Login.php';
require_once 'beans/Match.php';
require_once 'beans/Player.php';
//require_once 'beans/Rece.php';

session_start();

function sendXMLResponse($success, $message = '', $data = null) {
    header('Content-Type: text/xml');
    echo "<?xml version='1.0' encoding='UTF-8'?>\n";
    echo "<response>\n";
    echo "  <success>" . ($success ? 'true' : 'false') . "</success>\n";
    if ($message) {
        echo "  <message>" . htmlspecialchars($message) . "</message>\n";
    }
    if ($data) {
        foreach ($data as $key => $value) {
            echo "  <" . htmlspecialchars($key) . ">" . htmlspecialchars($value) . "</" . htmlspecialchars($key) . ">\n";
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


// Handle different HTTP methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $action = $_POST['action'] ?? '';
        
        switch($action) {
            case 'login':
                $username = $_POST['username'] ?? '';
                $password = $_POST['password'] ?? '';
                
                $login = $loginManager->checkCredentials($username, $password);
                if ($login) {
                    login($login);
                    sendXMLResponse(true, 'Login successful', [
                        'isAdmin' => $login->getRole() === 'Admin' ? 'true' : 'false',
                        'username' => $login->getUsername(),
                        'role' => $login->getRole()
                    ]);
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