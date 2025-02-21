<?php 
	include_once('DBConnection.php');
	include_once('beans/Match.php');
        
	class MatchBDManager
	{
		public function getMatchs()
		{
			$db = DBConnection::getInstance();

			$sql = "
				SELECT m.*, t.Name AS TeamName
				FROM DB_finalTVMurten.t_Match m
				INNER JOIN t_Team t ON m.FK_Team_Enemy = t.PK_Teams
				ORDER BY m.Datum
			";

			$result = $db->selectQuery($sql, array()); 

			$matchs = array();
			foreach ($result as $row) {
				$matchs[] = new Matchs(
					$row['PK_Match'],
					$row['Spiel'],
					$row['Wochentag'],
					$row['Datum'],
					$row['MatchZeit'],
					$row['TeamName'],
					$row['Halle']
				);
			}
			return $matchs;
		}

		public function getInXML()
		{
			$matchs = $this->getMatchs();
			$result = '<listMatchs>';
			foreach ($matchs as $match) {
				$result .= $match->toXML();
			}
			$result .= '</listMatchs>';
			return $result;
		}
	}
?>
