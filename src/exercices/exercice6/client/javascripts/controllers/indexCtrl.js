/*
 * Contrôleur de la vue "index.html"
 *
 * @author Zeina Alsawaf
 * @version 1.0 / 20-SEP-2013
 */

/**
 * Méthode appelée lors du retour avec succès du résultat des équipes
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamSuccess(data, text, jqXHR) {
	// Appelé lorsque la liste des équipes est reçue
    var cmbEquipes = document.getElementById("cmbEquipes");
    cmbEquipes.options.length = 0;
    $(data).find("equipe").each(function() {
        var equipe = new Equipe();
        equipe.setPk($(this).find("id").text());
        equipe.setNom($(this).find("nom").text());
        cmbEquipes.options[cmbEquipes.options.length] = new Option(equipe, JSON.stringify(equipe));
    });
}

/**
 * Méthode appelée lors du retour avec succès du résultat des joueurs
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerPlayerSuccess(data, text, jqXHR) {
	// Appelé lorsque la liste des joueurs est reçue
    
    var cmbMembres = document.getElementById("cmbMembres");
    cmbMembres.options.length = 0;
    $(data).find("membre").each(function() {
        var membre = new Joueur();
        membre.setPoints($(this).find("age").text());
        membre.setNom($(this).find("nom").text());
        cmbMembres.options[cmbMembres.options.length] = new Option(membre, JSON.stringify(membre));
    });
	
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamError(request, status, error) {
    alert("erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerPlayerError(request, status, error) {
    alert("erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function() {
    var butLoad = $("#displayTeams");
    var cmbEquipes = $("#cmbEquipes");
    var cmbMembres = $("#cmbMembres");
    var equipe = '';
    var membre = '';
    $.getScript("javascripts/beans/equipe.js", function() {
        console.log("equipe.js chargé !");
    });
    $.getScript("javascripts/beans/membre.js", function() {
        console.log("joueur.js chargé !");
    });
    $.getScript("javascripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");
        chargerTeam(chargerTeamSuccess, chargerTeamError);
    });

	// Ce qui se passe lorsque l'on sélectionne une équipe
    cmbEquipes.change(function(event) {
        equipe = this.options[this.selectedIndex].value;
        chargerPlayers(JSON.parse(equipe).pk, chargerPlayerSuccess, chargerPlayerError);
    });
	
	// Ce qui se passe lorsque l'on sélectionne une joueur
    cmbJoueurs.change(function(event) {
        membre = this.options[this.selectedIndex].value;
        alert(JSON.parse(membre).nom + ": " + JSON.parse(membre).age + " age");
    });
});



/*
<?php

include_once('../services/wrk.php');
include_once('../beans/Equipe.js');

$wrk = new Wrk();

$equipes = $wrk->getEquipes();

foreach ($equipes as $index => $equip) {
    echo 'ID: ' . ($index + 1) . ', Club: ' . $equip->getName() . '<br>';
}


include_once('../beans/Membre.js');
$membre = new Membre('Paul', 25);
$nom = $membre->getNom();
$numero = $membre->numero;

echo 'Un nouveau membre! Nom: ' . $nom . ', son âge: ' . $numero . '.';
?>
*/

