function chargerTeamSuccess(data, text, jqXHR) {
	// Appelé lorsque la liste des équipes est reçue
    console.log("Chargement des équipes réussi !");

    $.each(data, function(index, team) {
        var row = '<tr><td>' + team.id + '</td><td>' + team.name + '</td></tr>';
        $('#teams-table tbody').append(row);
    });
}

function chargerTeamError(jqXHR, text, error) {
    // Appelé en cas d'erreur
    console.log("Erreur de chargement des équipes : " + error);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function() {
    $.getScript("scripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");
        chargerTeam(chargerTeamSuccess, chargerTeamError);
    });

	
});