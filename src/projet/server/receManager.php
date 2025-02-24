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

    /*public function modifyReces($pkRece, $perfekt, $superInZone, $neutral, $schlecht, $direktFehler, $falscheEntscheidung)
    {
        return $this->dbReceManager->modifyReces($pkRece, $perfekt, $superInZone, $neutral, $schlecht, $direktFehler, $falscheEntscheidung);
    }*/
}
?>