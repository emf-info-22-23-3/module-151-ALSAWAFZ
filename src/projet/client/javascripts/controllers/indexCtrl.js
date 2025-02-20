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
    players.setSpielerKarte($(this).find("spielerKarte").text());



    txtplayer += "<tr><td>" + players.getSpielerNr() + "</td><td>" + players.getName() + "</td><td>" + players.getFamilyName() + "</td><td>" + players.getAdresse() + "</td><td>" + players.getFk_place() + "</td><td>" + players.getNatel() + "</td><td>" + players.getEmail() +"</td><td>" + players.getGeburstag() + "</td><td>" + players.getLizenz() + "</td><td>" + players.getSchreiber() +"</td><td>" + players.getSchiri() +"</td><td>" + players.getJS() +"</td></tr>";
  

    // Generate the HTML for each player card dynamically
    var playerImage = "../images/Team_individual_image/" + players.getSpielerKarte() + ".jpg";
        var playerCardHTML = `
            <div class="player-card">
                <div class="player-avatar">
                    <img src="${playerImage}" alt="${players.getName()}">
                </div>
                <h3>${players.getName()} ${players.getFamilyName()}</h3>
                <button class="login-btn" id="btnChosePlayer" data-image="${playerImage}"><a href="../html/playersStatsafterSelection.html">View Stats</a></button>
            </div>
        `;
        $(".players-grid").append(playerCardHTML);


    //============for playersafterSelection.html
    $(document).ready(function () {
      $(document).on("click", ".login-btn", function (event) {
          event.preventDefault(); // Prevent default action
  
          var playerImage = $(this).data("image");
          localStorage.setItem("selectedPlayerImage", playerImage);
  
          window.location.href = "../html/playersStatsafterSelection.html";
      });
  
      // On playersStatsafterSelection.html, load the stored image
      if ($(".chosen-player-card-image").length > 0) {
          var storedImage = localStorage.getItem("selectedPlayerImage");
          if (storedImage) {
              $(".chosen-player-card-image").html(`<img src="${storedImage}" alt="Player Card"  class="playersImageAfterSelection">`);
          }
      }
  });
  
    //===================================================

  
  });  

  var tableContentPlayers = document.getElementById("tableContentPlayers");
    if (tableContentPlayers) {
      tableContentPlayers.innerHTML = txtplayer;
    } else {
        console.error("tableContentPlayers element not found");
    }
}


  function chargerPlayersError(request, status, error) {
  alert("Erreur lors de la lecture des players: " + error);
}



function chargerMatchsSuccess(data, text, jqXHR){   
  var cmbAfterSelectionMatches = document.getElementById("cmbAfterSelectionMatches");
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
      //cmbAfterSelectionMatches.options[cmbAfterSelectionMatches.options.length] = new Option(matchs.getSpiel(), JSON.stringify(matchs));
    });  

    var tableContentMatches = document.getElementById("tableContentMatches");
    if (tableContentMatches) {
        tableContentMatches.innerHTML += txtmatches;
    } else {
        console.error("tableContentMatches element not found");
    }
}

function chargerMatchsError(request, status, error) {
alert("Erreur lors de la lecture des matchs: " + error);
}






function chargerRecesSuccess(data, text, jqXHR){   
  var txtReces = '';
  $(data).find("reces").each(function() {
    var reces = new Reces();
    reces.setPk($(this).find("pk_rece").text());
    reces.setFK_Match_Rece($(this).find("fk_match_rece").text());
    reces.setFK_Player_Rece($(this).find("fk_player_rece").text());
    reces.setPerfekt($(this).find("perfekt").text());
    reces.setSuperInZone($(this).find("superInZone").text());
    reces.setNeutral($(this).find("neutral").text());
    reces.setSchlecht($(this).find("schlecht").text());
    reces.setDirektFehler($(this).find("direktFehler").text());
    reces.setFalscheEntscheidung($(this).find("falscheEntscheidung").text());

    txtReces += "<tr><td>" + reces.getPerfekt() + "</td><td>" + reces.getSuperInZone() + "</td><td>" + reces.getNeutral() + "</td><td>" + reces.getSchlecht() + "</td><td>" + reces.getDirektFehler() + "</td><td>" + reces.getFalscheEntscheidung() + "</td></tr>";
  });  

  var tableContentReces = document.getElementById("tableContentRece");
  if (tableContentReces) {
    tableContentReces.innerHTML = txtReces;
  } else {
      console.error("tableContentRece element not found");
  }
}

function chargerRecesError(request, status, error) {
alert("Erreur lors de la lecture des reces: " + error);
}





$(document).ready(function() {
  var cmbAfterSelectionMatches = $("#cmbAfterSelectionMatches");


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
/*
  cmbAfterSelectionMatches.change(function(event) {
    afterSelectionMatches = this.options[this.selectedIndex].value;
    chosenplayer =
    chargerReces(JSON.parse(afterSelectionMatches).pk, JSON.parse(chosenplayer).pk, chargerRecesSuccess, chargerRecesError);
  });
  */
  
});

