<?php 
	include_once('DBConnection.php');
	include_once('beans/Player.php');
        
	class PlayerBDManager
	{
		
		public function getPlayers()
		{
			$count = 0;
			$liste = array();
			$connection = DBConnection::getInstance();
			$query = $connection->selectQuery("select p.*, t.Name AS PlaceName 
			FROM DB_FinalTVMurten.t_Player p 
			INNER JOIN t_Place t ON p.FK_Place = t.PK_Place
			ORDER BY p.PK_Player", array());
			foreach($query as $data){
				$schiri = ($data['Schiri'] == 1) ? "ja" : "nein";
				$js = ($data['JS'] == 1) ? "ja" : "nein";
				$schreiber = ($data['Schreiber'] == 1) ? "ja" : "nein";
				$players = new Players($data['PK_Player'], $data['SpielerNr'], $data['Name'], $data['FamilyName'], $data['Adresse'], $data['PlaceName'], $data['Natel'], $data['Email'], $data['Geburstag'], $data['LIZENZ'], $schreiber, $schiri, $js, $data['FK_Login'], $data['SpielerKarte']);
				$liste[$count++] = $players;
			}	
			return $liste;	
		}
		

		public function getInXML()
		{
			$listPlayers = $this->readPlayers();
			$result = '<listPlayers>';
			for($i=0;$i<sizeof($listPlayers);$i++) 
			{
				$result = $result .$listPlayers[$i]->toXML();
			}
			$result = $result . '</listPlayers>';
			return $result;
		}
	}
?>