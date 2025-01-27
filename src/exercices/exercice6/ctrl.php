<?php
function getEquipes(){
  require('wrk.php');
  return getEquipesFromDB();
}
?>

<?php

include_once('Membre.php');

$membre = new Membre('Paul', 25); 
$nom = $membre->getNom();
$numero = $membre->numero;

echo 'Un nouveau membre! Nom: ' . $nom . ', son âge: ' . $numero . '.';
?>