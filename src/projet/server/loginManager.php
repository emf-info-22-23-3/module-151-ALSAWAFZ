<?php

class LoginManager
{
    private $dbManager;

    public function __construct()
    {
        $this->dbManager = new LoginBDManager();
    }

    public function checkCredentials($username, $password)
    {
        $login = $this->dbManager->checkLogin($username);
        if ($login) {
                //Used password_verify() for secure password checking.
            if (password_verify($password, $login->getPassword())) { 
                return $login;
            }
        }
        return false;
    }
}
?>
