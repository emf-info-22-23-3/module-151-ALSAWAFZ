<?php 
	include_once('DBConnection.php');
	include_once('beans/Rece.php');
    /**
     * ReceBDManager is responsible for database operations related to reception (Rece) data.
    */        
	class ReceBDManager
{
    /**
     * Retrieves reception (Rece) data for a specific match and player.
     *
     * @param int $fkMatch  The foreign key (ID) of the match.
     * @param int $fkPlayer The foreign key (ID) of the player.
     * @return array        An array of Rece objects.
     */
    public function getRece($fkMatch, $fkPlayer)
    {
        $count = 0;
		$liste = array();
		$connection = DBConnection::getInstance();

        $query = $connection->selectQuery("
			SELECT * 
			FROM t_Rece r
			JOIN t_Match m ON r.FK_Match_Rece = m.PK_Match
			JOIN t_Player p ON r.FK_Player_Rece = p.PK_Player
			WHERE m.PK_Match = :matchid
			AND p.PK_Player = :playerid", array('matchid' => $fkMatch, 'playerid' => $fkPlayer));



        foreach ($query as $data) {
            $reces = new Rece(
                $data['PK_Rece'], 
				$data['FK_Player_Rece'],
				$data['FK_Match_Rece'],
				$data['Perfekt'], 
				$data['Super(Zone)'], 
				$data['Neutral'], 
				$data['Schlecht'], 
				$data['DirektFehler'], 
				$data['FalscheEntscheidung']
			);
            $liste[$count++] = $reces;
        }

        return $liste;
    }

    public function addRece($data)
    {
        $connection = DBConnection::getInstance();
        $connection->startTransaction();
    
        $query = $connection->executeQuery("
            INSERT INTO DB_finalTVMurten.t_Rece 
            (FK_Player_Rece, FK_Match_Rece, Perfekt, `Super(Zone)`, Neutral, Schlecht, DirektFehler, FalscheEntscheidung) 
            VALUES (:fk_player_rece, :fk_match_rece, :perfekt, :superInZone, :neutral, :schlecht, :direktFehler, :falscheEntscheidung)
        ", array(
            'fk_player_rece' => $data->getFKPlayerRece(),
            'fk_match_rece' => $data->getFKMatchRece(),
            'perfekt' => $data->getPerfekt(),
            'superInZone' => $data->getSuperZone(),
            'neutral' => $data->getNeutral(),
            'schlecht' => $data->getSchlecht(),
            'direktFehler' => $data->getDirektFehler(),
            'falscheEntscheidung' => $data->getFalscheEntscheidung()
        ));
    
        if ($query === false) {
            $connection->rollbackTransaction();
            error_log("Failed to insert Rece for Match ID: " . $data->getFKMatchRece() . ", Player ID: " . $data->getFKPlayerRece());
            return false;
        }
    
        $connection->commitTransaction();
        return $query;
    }
    
    /**
     * Updates reception (Rece) records in the database.
     *
     * @param Rece $data The Rece object containing updated data.
     * @return bool      True if the update was successful, False otherwise.
     */
    public function updateReces($data){
    $connection = DBConnection::getInstance();
    $connection->startTransaction();

   $query = $connection->executeQuery("
        UPDATE DB_finalTVMurten.t_Rece 
        SET 
            FK_Player_Rece = :fk_player_rece,
            FK_Match_Rece = :fk_match_rece,
            Perfekt = :perfekt, 
            `Super(Zone)` = :superInZone, 
            Neutral = :neutral, 
            Schlecht = :schlecht, 
            DirektFehler = :direktFehler, 
            FalscheEntscheidung = :falscheEntscheidung
        WHERE PK_Rece = :pk_rece
    ", array(
        'pk_rece' => $data->getPKRece(),
        'fk_player_rece' => $data->getFKPlayerRece(),
        'fk_match_rece' => $data->getFKMatchRece(),
        'perfekt' => $data->getPerfekt(),
        'superInZone' => $data->getSuperZone(),
        'neutral' => $data->getNeutral(),
        'schlecht' => $data->getSchlecht(),
        'direktFehler' => $data->getDirektFehler(),
        'falscheEntscheidung' => $data->getFalscheEntscheidung(),
    ));

    if ($query === false) {
        $connection->rollbackTransaction();
        error_log("Failed to update Rece for ID: " . $data->getPKRece());
        return false;
    }

    $connection->commitTransaction(); 
   return $query;
}


    /**
     * Converts reception (Rece) data to XML format.
     *
     * @param int $fkMatch  The foreign key (ID) of the match.
     * @param int $fkPlayer The foreign key (ID) of the player.
     * @return string       XML representation of the reception data.
     */
    public function getInXML($fkMatch, $fkPlayer)
    {
        $listReces = $this->getRece($fkMatch, $fkPlayer);
        $result = '<listReces>';
        foreach ($listReces as $rece) {
            $result .= $rece->toXML();
        }
        $result .= '</listReces>';
        return $result;
    }
}

?>