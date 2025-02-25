<?php
/**
 * PlayerManager is responsible for handling player-related operations.
 */
class PlayerManager
{
    /** @var PlayerBDManager Instance of the database manager for player operations. */
    private $dbPlayerManager;

    /**
     * Constructor initializes the PlayerBDManager instance.
     */
    public function __construct()
    {
        $this->dbPlayerManager = new PlayerBDManager();
    }

    /**
     * Retrieves a list of players from the database.
     *
     * @return array An array of Player objects.
     */
    public function getPlayers()
    {
        return $this->dbPlayerManager->getPlayers();
    }
}

?>
