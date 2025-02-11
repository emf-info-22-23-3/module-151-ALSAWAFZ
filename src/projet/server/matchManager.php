<?php 
	include_once('workers/MatchBDManager.php');
	include_once('beans/Match.php');
        
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$matchsBD = new MatachBDManager();
			echo $matchsBD->getInXML();
		}
	}
?>