<?php

/**
 * AngriffManager serves as a bridge between the application and the AngriffBDManager.
 * It provides methods to retrieve and update Angriff (attack) data.
 */
class AngriffManager
{
    /** @var AngriffBDManager Instance of the database manager for Angriff operations. */
    private $dbAngriffManager;

    /**
     * Constructor initializes the AngriffBDManager instance.
     */
    public function __construct()
    {
        $this->dbAngriffManager = new AngriffBDManager();
    }

    /**
     * Retrieves Angriff (attack) data for a given match and player.
     *
     * @param int $fkMatch  The foreign key (ID) of the match.
     * @param int $fkPlayer The foreign key (ID) of the player.
     * @return array        An array of Angriff objects.
     */
    public function getAngriffs($fkMatch, $fkPlayer)
    {
        return $this->dbAngriffManager->getAngriffs($fkMatch, $fkPlayer);
    }

    /**
     * Updates Angriff (attack) records in the database.
     *
     * @param Angriff $data The Angriff object containing updated data.
     * @return bool         True if the update was successful, False otherwise.
     */
    public function updateAngriffs($data)
    {
        return $this->dbAngriffManager->updateAngriffs($data);
    }

    public function addAngriffs($data)
    {
        return $this->dbAngriffManager->addAngriffs($data);
    }
}

?>