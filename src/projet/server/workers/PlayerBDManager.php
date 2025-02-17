<?php 
	include_once('Connexion.php');
	include_once('beans/Player.php');
        
	class PlayerBDManager
	{
		
		public function readPlayers()
		{
			$count = 0;
			$liste = array();
			$connection = Connexion::getInstance();
			$query = $connection->selectQuery("select * from t_Player", array());
			foreach($query as $data){
				$players = new Players($data['PK_Player'], $data['SpielerNr'], $data['Name'], $data['FamilyName'], $data['Adresse'], $data['FK_Place'], $data['Natel'], $data['Email'], $data['Geburstag'], $data['LIZENZ'], $data['Schreiber'], $data['Schiri'], $data['JS'], $data['FK_Login']);
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