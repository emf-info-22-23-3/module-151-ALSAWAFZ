<?php
include_once('Wrk.php');
include_once('Equipe.php');

$wrk = new Wrk();

$equipes = $wrk->getEquipes();

foreach ($equipes as $index => $equip) {
    echo 'ID: ' . ($index + 1) . ', Club: ' . $equip->getName() . '<br>';
}

include_once('Membre.php');
$membre = new Membre('Paul', 25);
$nom = $membre->getNom();
$numero = $membre->numero;

echo 'Un nouveau membre! Nom: ' . $nom . ', son âge: ' . $numero . '.';
?>
