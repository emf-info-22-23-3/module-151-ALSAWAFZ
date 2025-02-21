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
            if ($password === $login->getPassword()) {
                return $login;
            }
        }
        return false;
    }
}