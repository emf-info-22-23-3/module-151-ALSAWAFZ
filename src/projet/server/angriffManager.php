<?php

class AngriffManager
{

    private $dbAngriffManager;

    public function __construct()
    {
        $this->dbAngriffManager = new AngriffBDManager();
    }

    public function getAngriffs($fkMatch, $fkPlayer)
    {
        return $this->dbAngriffManager->getAngriffs($fkMatch, $fkPlayer);
    }

    public function updateAngriffs($data)
    {
        return $this->dbAngriffManager->updateAngriffs($data);
    }

}
?>