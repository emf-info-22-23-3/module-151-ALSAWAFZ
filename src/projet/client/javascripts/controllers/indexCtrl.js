function chargerPlayersSuccess(data, text, jqXHR){   
  var txtplayer = '';
  $(data).find("players").each(function() {
    var players = new Players();

    players.setPk($(this).find("pk_players").text());
    players.setSpielerNr($(this).find("spielerNr").text());
    players.setName($(this).find("name").text());
    players.setFamilyName($(this).find("familyName").text());
    players.setAdresse($(this).find("adresse").text());
    players.setFk_place($(this).find("fk_place").text());
    players.setNatel($(this).find("natel").text());
    players.setEmail($(this).find("email").text());
    players.setGeburstag($(this).find("geburstag").text());
    players.setLizenz($(this).find("lizenz").text());
    players.setSchreiber($(this).find("schreiber").text());
    players.setSchiri($(this).find("schiri").text());
    players.setJS($(this).find("js").text());
    players.setFk_login($(this).find("fk_login").text());


    txtplayer += "<tr><td>" + players.getSpielerNr() + "</td><td>" + players.getName() + "</td><td>" + players.getFamilyName() + "</td><td>" + players.getAdresse() + "</td><td>" + players.getFk_place() + "</td><td>" + players.getNatel() + "</td></tr>";
  });  
  document.getElementById("tableContentPlayers").innerHTML = txtplayer;
}

  function chargerPlayersError(request, status, error) {
  alert("Erreur lors de la lecture des players: " + error);
}




function chargerMatchsSuccess(data, text, jqXHR){   
    var txtmatches = '';
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
      txtmatches += "<tr><td>" + matchs.getWochentag() + " " + matchs.getDatum() + " " + matchs.getMatchZeit() + "</td><td>" + matchs.toString() + "</td></tr>";
    });  
    document.getElementById("tableContentMatches").innerHTML = txtmatches;
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
  $.getScript("../javascripts/beans/players.js", function() {
    console.log("players.js chargé !");
  });
  $.getScript("../javascripts/services/servicesHttp.js", function() {
    console.log("servicesHttp.js chargé !");
    chargerPlayers(chargerPlayersSuccess, chargerPlayersError);
    chargerMatchs(chargerMatchsSuccess, chargerMatchsError);
    
  });
  
});

