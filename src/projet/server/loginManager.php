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
        return $this->dbManager->verifyPassword($username, $password);
    }
}
?>
