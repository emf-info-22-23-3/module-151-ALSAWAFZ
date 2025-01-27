<?php
if($_GET['action'] == "equipe")
{
	echo '<equipes>';
	echo '<equipe><id>3</id><nom>SC Bern</nom></equipe>';
	echo '<equipe><id>4</id><nom>Fribourg-Gotteron</nom></equipe>';
	echo '<equipe><id>7</id><nom>HC Davos</nom></equipe>';
	echo '<equipe><id>8</id><nom>Geneve-Servette</nom></equipe>';
	echo '</equipes>';
}
if($_GET['action'] == "membre")
{
	echo '<membres>';
	if ($_GET['equipeId'] == '3')
	{
		echo '<membre><id>2</id><nom>Ivo Ruthemann</nom><age>56</age></membre>';
		echo '<membre><id>3</id><nom>Franco Collenberg</nom><age>15</age></membre>';
		echo '<membre><id>4</id><nom>Marco Buhrer</nom><age>19</age></membre>';
		echo '<membre><id>5</id><nom>Martin Pluss</nom><age>20</age></membre>';
	}
	if ($_GET['equipeId'] == '4')
	{
		echo '<membre><id>2</id><nom>Julien Sprunger</nom><age>16</age></membre>';
		echo '<membre><id>3</id><nom>Beni Pluss</nom><age>12</age></membre>';
	}
	if ($_GET['equipeId'] == '8')
	{
		echo '<membre><id>2</id><nom>Goran Bezina</nom><age>15</age></membre>';
	}
	if ($_GET['equipeId'] == '7')
	{
		echo '<membre><id>2</id><nom>Reto von Arx</nom></membre>';
	}
	echo '</membres>';
}

?>