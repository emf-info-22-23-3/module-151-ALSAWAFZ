<?php 
	include_once('DBConnection.php');
	include_once('beans/Rece.php');
        
	class ReceBDManager
{
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