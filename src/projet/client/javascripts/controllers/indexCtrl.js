
function chargerMatchsSuccess(data, text, jqXHR)

{   

    var txt = '';
    $(data).find("matchs").each(function() {
      var matchs = new Matchs();
      matchs.setPk($(this).find("pk_matchs").text());
      matchs.setSpiel($(this).find("spiel").text());
      matchs.setWochentag($(this).find("wochentag").text());
      matchs.setDatum($(this).find("datum").text());
      matchs.setMatchZeit($(this).find("matchZeit").text());
      matchs.setFK_Enemy_Team($(this).find("fk_enemy_team").text());
      matchs.setHalle($(this).find("halle").text());
      console.log($(this).find("fk_enemy_team").text());
      txt += "<tr><td>" + matchs.getWochentag() + " " + matchs.getDatum() + " " + matchs.getMatchZeit() + "</td><td>" + matchs.toString() + "</td></tr>";
    });  
    document.getElementById("tableContent").innerHTML = txt;
}

function chargerMatchsError(request, status, error) {
  alert("Erreur lors de la lecture des matchs: " + error);
}


$(document).ready(function() {

  $.getScript("../javascripts/helpers/dateHelper.js", function() {
    console.log("dateHelper.js chargé !");
  });
  $.getScript("../javascripts/beans/matchs.js", function() {
    console.log("matchs.js chargé !");
  });
  $.getScript("../javascripts/services/servicesHttp.js", function() {
    console.log("servicesHttp.js chargé !");
    chargerMatchs(chargerMatchsSuccess, chargerMatchsError);
  });
});

