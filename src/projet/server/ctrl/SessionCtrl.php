<?php
include_once(realpath(__DIR__ . '/beans/Login.php'));

class SessionCtrl
{
    private static $instance = null;

    private function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function getInstance(): SessionCtrl
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function startSession(Login $login): bool
    {
        $_SESSION["currentUser"] = serialize($login);  // Store login object
        return isset($_SESSION["currentUser"]);
    }

    public function destroySession(): bool
    {
        session_unset();
        session_destroy();
        return !isset($_SESSION["currentUser"]);
    }

    public function isConnected(): bool
    {
        return isset($_SESSION["currentUser"]);
    }

    public function currentUser(): ?Login
    {
        return isset($_SESSION["currentUser"]) ? unserialize($_SESSION["currentUser"]) : null;
    }
}
?>
