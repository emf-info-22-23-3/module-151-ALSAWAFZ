class IndexCtrl {
  constructor() {
    this.http = new servicesHttp();
      // Bind the methods to preserve 'this' context
      this.connectSuccess = this.connectSuccess.bind(this);
      this.disconnectSuccess = this.disconnectSuccess.bind(this);

      this.chargerPlayersSuccess = this.chargerPlayersSuccess.bind(this);
      this.chargerPlayersError = this.chargerPlayersError.bind(this);

      this.chargerMatchsSuccess = this.chargerMatchsSuccess.bind(this);
      this.chargerMatchsError = this.chargerMatchsError.bind(this);

      //this.chargerRecesSuccess = this.chargerRecesSuccess.bind(this);
      //this.chargerRecesError = this.chargerRecesError.bind(this);

  }



connectSuccess(data, text, jqXHR) {
  console.log("connectSuccess called");
  if ($(data).find("success").text() === 'true') {
        console.log($(data));
        console.log(data);
      Toastify({
          text: "Login successful",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#33cc33"
      }).showToast();

      if($(data).find("Admin").text() === 'true'){
          window.location.href = "../html/playersStatsafterSelection.html"; 
      } else {
          window.location.href = "../html/playersStatsafterSelection.html"; 
      }
  } else {
        console.log($(data));
        console.log(data);
      Toastify({
          text: "Login failed. Incorrect username or password.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ff3333"
      }).showToast();
  }
}

disconnectSuccess(data, text, jqXHR) {
  Toastify({
      text: "User disconnected",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#33cc33"
  }).showToast();
  
  window.location.href = "../login.html";
}







chargerPlayersSuccess(data, text, jqXHR){   
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
      $(document).on("click", "#btnChosePlayer", function (event) {
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


chargerPlayersError(request, status, error) {
  alert("Erreur lors de la lecture des players: " + error);
}



chargerMatchsSuccess(data, text, jqXHR){   
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
     
      txtmatches += "<tr><td>" + matchs.getWochentag() + " " + matchs.getDatum() + " " + matchs.getMatchZeit() + "</td><td>VS. " + matchs.getFK_Enemy_Team() + ", IN: " + matchs.getHalle() + "</td></tr>";
      //cmbAfterSelectionMatches.options[cmbAfterSelectionMatches.options.length] = new Option(matchs.getSpiel(), JSON.stringify(matchs));
      
    
    
    });  

    var tableContentMatches = document.getElementById("tableContentMatches");
    if (tableContentMatches) {
        tableContentMatches.innerHTML += txtmatches;
    } else {
        console.error("tableContentMatches element not found");
    }
}

chargerMatchsError(request, status, error) {
alert("Erreur lors de la lecture des matchs: " + error);
}






/*chargerRecesSuccess(data, text, jqXHR){   
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

chargerRecesError(request, status, error) {
alert("Erreur lors de la lecture des reces: " + error);
}
*/
}



  /*cmbAfterSelectionMatches.change(function(event) {
    afterSelectionMatches = this.options[this.selectedIndex].value;
    chosenplayer =
    chargerReces(JSON.parse(afterSelectionMatches).pk, JSON.parse(chosenplayer).pk, chargerRecesSuccess, chargerRecesError);
  });*/
  
   //chargerPlayers(chargerPlayersSuccess, chargerPlayersError);

  $(document).ready(function() {
    $.when(
        $.getScript("../javascripts/services/servicesHttp.js"), // Ensure this is loaded first
        $.getScript("../javascripts/helpers/dateHelper.js"),
        $.getScript("../javascripts/beans/matchs.js"),
        $.getScript("../javascripts/beans/players.js")
    ).done(function() {
        console.log("All scripts loaded!");
        
        var indexCtrl = new IndexCtrl();

        indexCtrl.http.getMatchs(indexCtrl.chargerMatchsSuccess, indexCtrl.chargerMatchsError);
        indexCtrl.http.getPlayers(indexCtrl.chargerPlayersSuccess, indexCtrl.chargerPlayersError);


        $("#loginForm").on("submit", function(event) {
            event.preventDefault();
            var username = $("#username").val();
            var password = $("#password").val();
            console.log("Form submitted");
            console.log("Sending username:", username, "and password:", password);

            indexCtrl.http.connect(username, password, indexCtrl.connectSuccess, CallbackError);
        });

    }).fail(function(jqxhr, settings, exception) {
        console.error("Failed to load scripts: ", exception);
    });
});


