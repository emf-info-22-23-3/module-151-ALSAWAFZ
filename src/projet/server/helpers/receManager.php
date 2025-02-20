<?php 
	include_once('../workers/ReceBDManager.php');
	include_once('../beans/Rece.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$recesBD = new ReceBDManager();
			echo $recesBD->getInXML($_GET['matchid'], $_GET['playerid']);
		}
	}
?>