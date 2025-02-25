<?php
include_once('DBConnection.php');
include_once('beans/Angriff.php');

/**
 * Class AngriffBDManager
 *
 * Manages Angriff (attack) data from the database, allowing retrieval,
 * updates, and XML representation of Angriff records.
 */
class AngriffBDManager
{
    /**
     * Retrieves a list of Angriff objects for a specific match and player.
     *
     * @param int $fkMatch The foreign key of the match.
     * @param int $fkPlayer The foreign key of the player.
     * @return Angriff[] An array of Angriff objects.
     */
    public function getAngriffs($fkMatch, $fkPlayer)
    {
        $count = 0;
        $liste = array();
        $connection = DBConnection::getInstance();

        $query = $connection->selectQuery("
            SELECT * 
            FROM t_Angriff a
            JOIN t_Match m ON a.FK_Match_Angriff = m.PK_Match
            JOIN t_Player p ON a.FK_Player_Angriff = p.PK_Player
            WHERE m.PK_Match = :matchid
            AND p.PK_Player = :playerid",
            array('matchid' => $fkMatch, 'playerid' => $fkPlayer)
        );

        foreach ($query as $data) {
            $angriffs = new Angriff(
                $data['PK_Angriff'], 
                $data['FK_Player_Angriff'],
                $data['FK_Match_Angriff'],
                $data['BälleErhalten'], 
                $data['Punkte'], 
                $data['Druckvoll'], 
                $data['Zu easy'], 
                $data['Fehler'], 
                $data['Block Punkt'],
                $data['Block'],
                $data['Ass']
            );
            $liste[$count++] = $angriffs;
        }

        return $liste;
    }

    /**
     * Updates an Angriff record in the database.
     *
     * @param Angriff $data The Angriff object containing updated values.
     * @return bool True if the update is successful, false otherwise.
     */
    public function updateAngriffs($data)
    {
        $connection = DBConnection::getInstance();
        $connection->startTransaction();

        $query = $connection->executeQuery("
            UPDATE DB_finalTVMurten.t_Angriff 
            SET FK_Match_Angriff = :fk_match_angriff,
                FK_Player_Angriff = :fk_player_angriff,
                BälleErhalten = :balleerhalten,
                Punkte = :punkte,
                Druckvoll = :druckvoll, 
                `Zu easy` = :zueasy, 
                Fehler = :fehler,
                `Block Punkt` = :blockpunkt,
                Block = :block, 
                Ass = :ass 
            WHERE PK_Angriff = :pk_angriff;
        ", array(
            'pk_angriff' => $data->getPKAngriff(),
            'fk_match_angriff' => $data->getFKMatchAngriff(),
            'fk_player_angriff' => $data->getFKPlayerAngriff(),
            'balleerhalten' => $data->getBalleErhalten(),
            'punkte' => $data->getPunkte(),
            'druckvoll' => $data->getDruckvoll(),
            'zueasy' => $data->getZuEasy(),
            'fehler' => $data->getFehler(),
            'blockpunkt' => $data->getBlockPunkt(),
            'block' => $data->getBlock(),
            'ass' => $data->getAss()
        ));

        if ($query === false) {
            $connection->rollbackTransaction();
            error_log("Failed to update Angriff for ID: " . $data->getPKAngriff());
            return false;
        }

        $connection->commitTransaction();
        return $query;
    }

    /**
     * Returns Angriff records as an XML string.
     *
     * @param int $fkMatch The foreign key of the match.
     * @param int $fkPlayer The foreign key of the player.
     * @return string XML representation of Angriff records.
     */
    public function getInXML($fkMatch, $fkPlayer)
    {
        $listAngriffs = $this->getAngriffs($fkMatch, $fkPlayer);
        $result = '<listAngriffs>';
        foreach ($listAngriffs as $angriffs) {
            $result .= $angriffs->toXML();
        }
        $result .= '</listAngriffs>';
        return $result;
    }
}
?>
