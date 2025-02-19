<?php 
	include_once('Connexion.php');
	include_once('beans/Rece.php');
        
	class ReceBDManager
	{
		
		public function readRece($fkMatch, $fkPlayer)
		{
			$count = 0;
			$liste = array();
			$connection = Connexion::getInstance();
            $query = $connection->selectQuery("select * from t_Rece where FK_Player_Rece = " .$fkPlayer. " AND FK_Match_Rece = " .$fkMatch, array());			
            foreach($query as $data){
				$reces = new Rece($data['PK_Rece'], $data['FK_Player_Rece'], $data['FK_Match_Rece'], $data['Perfekt'], $data['SuperInZone'], $data['Neutral'], $data['Schlecht'], $data['DirektFehler'], $data['FalscheEntscheidung']);
				$liste[$count++] = $reces;
			}	
			return $liste;	
		}
		

		public function getInXML($fkMatch, $fkPlayer)
		{
			$listReces = $this->readRece($fkMatch, $fkPlayer);
			$result = '<listReces>';
			for($i=0;$i<sizeof($listReces);$i++) 
			{
				$result = $result .$listReces[$i]->toXML();
			}
			$result = $result . '</listReces>';
			return $result;
		}
	}
?>