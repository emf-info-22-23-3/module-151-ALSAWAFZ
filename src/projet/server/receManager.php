<?php

class ReceManager
{

    private $dbReceManager;

    public function __construct()
    {
        $this->dbReceManager = new ReceBDManager();
    }

    public function getRece($fkMatch, $fkPlayer)
    {
        return $this->dbReceManager->getRece($fkMatch, $fkPlayer);
    }

    public function updateReces($data)
    {
        return $this->dbReceManager->updateReces($data);
    }
}
?>