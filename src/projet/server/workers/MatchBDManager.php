<?php 
	include_once('Connexion.php');
	include_once('beans/Match.php');
        
	class MatachBDManager
	{
		
		public function readMatchs()
		{
			$count = 0;
			$liste = array();
			$connection = Connexion::getInstance();
			$query = $connection->selectQuery("
			SELECT m.*, t.Name AS TeamName
        FROM DB_finalTVMurten.t_Match m
        INNER JOIN t_Team t ON m.FK_Team_Enemy = t.PK_Teams
		ORDER BY m.Datum
			", array());
			foreach($query as $data){
				$matchs = new Matchs($data['PK_Match'], $data['Spiel'], $data['Wochentag'], $data['Datum'],
                 $data['MatchZeit'], $data['TeamName'], $data['Halle']);
				$liste[$count++] = $matchs;
			}	
			return $liste;	
		}
		

		public function getInXML()
		{
			$listMatchs = $this->readMatchs();
			$result = '<listMatchs>';
			for($i=0;$i<sizeof($listMatchs);$i++) 
			{
				$result = $result .$listMatchs[$i]->toXML();
			}
			$result = $result . '</listMatchs>';
			return $result;
		}
	}
?>