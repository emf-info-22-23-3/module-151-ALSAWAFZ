<?php 
	include_once('../workers/PlayerBDManager.php');
	include_once('../beans/Player.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$playersBD = new PlayerBDManager();
			echo $playersBD->getInXML();
		}
	}
?>