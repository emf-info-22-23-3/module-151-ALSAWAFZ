<?php

class PlayerManager
{

    private $dbPlayerManager;

    public function __construct()
    {
        $this->dbPlayerManager = new PlayerBDManager();
    }

    public function getPlayers()
    {
        return $this->dbPlayerManager->getPlayers();
    }
}
?>