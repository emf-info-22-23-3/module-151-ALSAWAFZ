<?php
/**
 * MatchManager handles operations related to retrieving match data.
 */
class MatchManager
{
    /** @var MatchBDManager Instance of the database manager for match operations. */
    private $dbMatchManager;

    /**
     * Constructor initializes the MatchBDManager instance.
     */
    public function __construct()
    {
        $this->dbMatchManager = new MatchBDManager();
    }

    /**
     * Retrieves a list of matches from the database.
     *
     * @return array An array of Match objects.
     */
    public function getMatchs()
    {
        return $this->dbMatchManager->getMatchs();
    }
}

?>
