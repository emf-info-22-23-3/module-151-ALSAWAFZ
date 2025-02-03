<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	if($_POST['action'] == "connect")
	{
		
		if ($_POST['password'] == 'emf') {
			
            $_SESSION['logged'] = true;
            echo '<result>true</result>';
        } else {
            unset($_SESSION['logged']);
            echo '<result>false</result>';
        }
	}

	if($_POST['action'] == "disconnect")
	{
		session_destroy();
		session_unset();
        echo '<result>true</result>';
	}
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
	if($_GET['action'] == "getInfos")
		{
		if (isset($_SESSION['logged']) && $_SESSION['logged'] == true) {
            echo '<users>';
            echo '<user><name>Victor Legros</name><salaire>9876</salaire></user>';
            echo '<user><name>Marinette Lachance</name><salaire>7540</salaire></user>';
            echo '<user><name>Gustave Latuile</name><salaire>4369</salaire></user>';
            echo '<user><name>Basile Ledisciple</name><salaire>2384</salaire></user>';
            echo '</users>';
        } else {
        }
		if($_GET['action'] == "disconnect")
	{
		unset($_SESSION['logged']);
        echo '<result>true</result>';
	}
	}
}

?>