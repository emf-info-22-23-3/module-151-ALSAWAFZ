<?php 
	include_once('DBConnection.php');
	include_once('beans/Angriff.php');
        
	class AngriffBDManager
{
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
			AND p.PK_Player = :playerid", array('matchid' => $fkMatch, 'playerid' => $fkPlayer));



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