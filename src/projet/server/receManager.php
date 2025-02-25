<?php

// ReceManager is responsible for handling reception (Rece) data logic.
class ReceManager
{
    // Instance of the database manager for Rece operations
    private $dbReceManager;

    // Constructor initializes the database manager
    public function __construct()
    {
        $this->dbReceManager = new ReceBDManager();
    }

    /**
     * Fetch reception (Rece) data for a specific match and player.
     * 
     * @param int $fkMatch  The primary key (ID) of the match.
     * @param int $fkPlayer The primary key (ID) of the player.
     * @return array        An array of Rece objects.
     */
    public function getRece($fkMatch, $fkPlayer)
    {
        return $this->dbReceManager->getRece($fkMatch, $fkPlayer);
    }

    /**
     * Update reception (Rece) records in the database.
     * 
     * @param Rece $data The Rece object containing updated data.
     * @return bool      True if the update was successful, False otherwise.
     */
    public function updateReces($data)
    {
        return $this->dbReceManager->updateReces($data);
    }
}
?>
