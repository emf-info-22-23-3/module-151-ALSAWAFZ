<?php
require_once './Wrk/Wrk.php';
require_once './Beans/Equipe.php';

$wrk = new Wrk();
$equipes = $wrk->getEquipes();
echo json_encode($equipes);