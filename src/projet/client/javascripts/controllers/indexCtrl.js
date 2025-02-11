
function chargerMatchsSuccess(data, text, jqXHR)
{   
	var cmbMatchs = document.getElementById("cmbMatchs");
    $(data).find("matchs").each(function() {
      var matchs = new Matchs();
      matchs.setPk($(this).find("pk_matchs").text());
      matchs.setSpiel($(this).find("spiel").text());
      matchs.setWochentag($(this).find("wochentag").text());
      matchs.setDatum($(this).find("datum").text());
      matchs.setMatchZeit($(this).find("matchZeit").text());
      matchs.setFK_Enemy_Team($(this).find("fk_Enemy_Team").text());
      matchs.setHalle($(this).find("halle").text());

    
	  cmbMatchs.options[cmbMatchs.options.length] = new Option(matchs, JSON.stringify(matchs));
    });  
}

function chargerMatchsError(request, status, error) {
  alert("Erreur lors de la lecture des matchs: " + error);
}


$(document).ready(function() {
  var cmbMatchs = $("#cmbMatchs");
  var matchs = '';

  $.getScript("javascripts/helpers/dateHelper.js", function() {
    console.log("dateHelper.js chargé !");
  });
  $.getScript("javascripts/beans/matchs.js", function() {
    console.log("matchs.js chargé !");
  });
  $.getScript("javascripts/services/servicesHttp.js", function() {
    console.log("servicesHttp.js chargé !");
    chargerPays(chargerMatchsSuccess, chargerMatchsError);
  });
  cmbPays.change(function(event) {
    matchs = this.options[this.selectedIndex].value;
    chargerSkieurs(JSON.parse(pays).pk, chargerSkieursSuccess, chargerSkieursError);
  });

});

