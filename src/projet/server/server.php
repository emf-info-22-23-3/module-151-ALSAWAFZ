<?php

// Including required configuration and database management files
require_once 'workers/connectionConfig.php'; // Contains database connection configurations
require_once 'workers/DBConnection.php'; // Manages database connections
require_once 'workers/LoginBDManager.php'; // Handles login-related database operations
require_once 'workers/MatchBDManager.php'; // Handles match-related database operations
require_once 'workers/PlayerBDManager.php'; // Handles player-related database operations
require_once 'workers/ReceBDManager.php'; // Handles reception statistics in the database
require_once 'workers/AngriffBDManager.php'; // Handles attack (Angriff) statistics in the database

// Including business logic files
require_once 'LoginManager.php'; // Manages user authentication logic
require_once 'MatchManager.php'; // Manages match logic
require_once 'PlayerManager.php'; // Manages player logic
require_once 'ReceManager.php'; // Manages reception statistics logic
require_once 'AngriffManager.php'; // Manages attack statistics logic

// Including data models
require_once 'beans/Login.php'; // Represents the Login entity
require_once 'beans/Match.php'; // Represents the Match entity
require_once 'beans/Player.php'; // Represents the Player entity
require_once 'beans/Rece.php'; // Represents the Rece entity
require_once 'beans/Angriff.php'; // Represents the Angriff entity

// Starting a session to track user authentication status
session_start();

/**
 * Sends an XML response to the client.
 * This function constructs an XML document with success status,
 * a message, and optional data.
 *
 * @param bool $success Indicates if the request was successful.
 * @param string $message A descriptive message about the request status.
 * @param array|null $data The data array that will be converted into XML.
 */
function sendXMLResponse($success, $message = '', $data = null) {
    header('Content-Type: text/xml; charset=UTF-8'); // Ensures proper XML response
    echo "<?xml version='1.0' encoding='UTF-8'?>\n";
    echo "<response>\n";
    echo "  <success>" . ($success ? 'true' : 'false') . "</success>\n";
    
    if ($message) {
        echo "  <message>" . htmlspecialchars($message, ENT_XML1, 'UTF-8') . "</message>\n";
    }

    // Convert data array into XML if provided
    if (!empty($data) && is_array($data)) {
        foreach ($data as $key => $items) {
            if (is_array($items)) {
                foreach ($items as $item) {
                    // Ensure objects have a toXML() method for correct serialization
                    if (method_exists($item, 'toXML')) {
                        echo $item->toXML();
                    }
                }
            }
        }
    }

    echo "</response>";
    exit; // Stop further script execution after sending the response
}

/**
 * Checks if a user is logged in by verifying session data.
 *
 * @return bool True if logged in, otherwise false.
 */
function isLoggedIn() {
    return isset($_SESSION['login_id']);
}

/**
 * Checks if the logged-in user has admin privileges.
 *
 * @return bool True if user is an admin, otherwise false.
 */
function isAdmin() {
    return isset($_SESSION['login_id']) && isset($_SESSION['role']) && $_SESSION['role'] === 'Admin';
}

/**
 * Logs in a user by storing their information in the session.
 *
 * @param Login $login The login object containing user credentials.
 */
function login($login) {
    $_SESSION['login_id'] = $login->getPkLogin(); // Store user ID
    $_SESSION['username'] = $login->getUsername(); // Store username
    $_SESSION['role'] = $login->getRole(); // Store user role (Admin/User)
}

/**
 * Logs out a user by destroying the session data.
 */
function logout() {
    session_unset(); // Unset session variables
    session_destroy(); // Destroy session
}

// Initializing database managers
$loginManager = new LoginManager();
$matchManager = new MatchManager();
$playerManager = new PlayerManager();
$receManager = new ReceManager();
$angriffManager = new AngriffManager();

// Handling HTTP request methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST': // Handle user authentication and logout actions
        $action = $_POST['action'] ?? '';

        switch ($action) {
            case 'login': // Login action
                $username = $_POST['username'] ?? '';
                $password = $_POST['password'] ?? '';

                $login = $loginManager->checkCredentials($username, $password);
                if ($login) {
                    login($login); // Store session data
                    sendXMLResponse(true, 'Login successful', [
                        'isAdmin' => $login->getRole() === 'Admin' ? 'true' : 'false',
                        'username' => $login->getUsername(),
                        'role' => $login->getRole()
                    ]);
                } else {
                    sendXMLResponse(false, 'Invalid credentials');
                }
                break;

            case 'disconnect': // Logout action
                logout();
                sendXMLResponse(true, 'Logout successful');
                break;

            default:
                sendXMLResponse(false, 'Invalid action');
                break;
        }
        break;

    case 'GET': // Handle data retrieval requests
        $action = $_GET['action'] ?? '';

        switch ($action) {
            case 'getMatchs':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }
                sendXMLResponse(true, 'Matches retrieved', ['matchs' => $matchManager->getMatchs()]);
                break;

            case 'getPlayers':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }
                sendXMLResponse(true, 'Players retrieved', ['players' => $playerManager->getPlayers()]);
                break;

            case 'getRece':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }
                
                $matchId = $_GET['matchPk'] ?? '';
                $player = $_GET['playerPk'] ?? '';

                if ($player == '' || $matchId == '') {
                    sendXMLResponse(false, 'Player ID or Match ID cannot be empty');
                    break;
                }

                sendXMLResponse(true, 'Reces retrieved', ['reces' => $receManager->getRece($matchId, $player)]);
                break;

            case 'getAngriff':
                if (!isLoggedIn()) {
                    sendXMLResponse(false, 'Please log in first');
                    break;
                }

                $matchId = $_GET['matchPk'] ?? '';
                $player = $_GET['playerPk'] ?? '';

                if ($player == '' || $matchId == '') {
                    sendXMLResponse(false, 'Player ID or Match ID cannot be empty');
                    break;
                }

                sendXMLResponse(true, 'Angriffs retrieved', ['angriffs' => $angriffManager->getAngriffs($matchId, $player)]);
                break;
        }
        break;

    case 'PUT': // Handle updates to existing data
        if (!isLoggedIn()) {
            sendXMLResponse(false, 'Please log in first');
            break;
        }

        if (!isAdmin()) {
            sendXMLResponse(false, 'Administrator access required');
            break;
        }

        parse_str(file_get_contents("php://input"), $data);

        if (empty($data)) {
            sendXMLResponse(false, 'No data received for update');
            break;
        }

        // Update Angriff entity
        if (isset($data['pk_angriff'])) {
            $result = $angriffManager->updateAngriffs(new Angriff(
              $data['pk_angriff'] ?? '',
              $data['matchPk'] ?? '',
              $data['playerPk'] ?? '',
              $data['balleErhalten'] ?? '',
              $data['punkte'] ?? '',
              $data['druckvoll'] ?? '',
              $data['zuEasy'] ?? '',
              $data['fehler'] ?? '',
              $data['blockPunkt'] ?? '',
              $data['block'] ?? '',
              $data['ass'] ?? ''
            ));

            sendXMLResponse($result, $result ? "Angriff updated successfully" : "Failed to update Angriff");
            break;
        }

        // Update Rece entity
        if (isset($data['pk_rece'])) {
            $result = $receManager->updateReces(new Rece(
              $data['pk_rece'] ?? '',
              $data['playerPk'] ?? '',
              $data['matchPk'] ?? '',
              $data['perfekt'] ?? '',
              $data['superInZone'] ?? '',
              $data['neutral'] ?? '',
              $data['schlecht'] ?? '',
              $data['direktFehler'] ?? '',
              $data['falscheEntscheidung'] ?? ''
            ));
            sendXMLResponse($result, $result ? "Rece updated successfully" : "Failed to update Rece");
            break;
        }


        sendXMLResponse(false, "Invalid PUT data: Missing required parameters");
        break;

    case 'DELETE':
        sendXMLResponse(false, 'DELETE method not implemented');
        break;

    default:
        sendXMLResponse(false, 'Invalid request method');
        break;
}
?>
