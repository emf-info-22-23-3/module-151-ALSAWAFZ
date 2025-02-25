<?php
/**
 * LoginManager handles user authentication by verifying credentials.
 */
class LoginManager
{
    /** @var LoginBDManager Instance of the database manager for login operations. */
    private $dbManager;

    /**
     * Constructor initializes the LoginBDManager instance.
     */
    public function __construct()
    {
        $this->dbManager = new LoginBDManager();
    }

    /**
     * Verifies user credentials by checking the username and password.
     *
     * @param string $username The username provided by the user.
     * @param string $password The password provided by the user.
     * @return Login|false     Returns a Login object if authentication is successful, otherwise false.
     */
    public function checkCredentials($username, $password)
    {
        return $this->dbManager->verifyPassword($username, $password);
    }
}

?>