<?php

class ReceManager
{

    private $dbReceManager;

    public function __construct()
    {
        $this->dbReceManager = new ReceBDManager();
    }

    public function getReces()
    {
        return $this->dbReceManager->getReces($fkMatch, $fkPlayer);
    }
}
?>