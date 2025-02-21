<?php
class MatchManager
{
    private $dbMatchManager;

    public function __construct()
    {
        $this->dbMatchManager = new MatchBDManager();
    }

    public function getMatchs()
    {
        return $this->dbMatchManager->getMatchs();
    }
}
?>
