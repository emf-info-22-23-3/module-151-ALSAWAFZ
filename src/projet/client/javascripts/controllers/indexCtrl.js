class IndexCtrl {

    constructor() {
      this.http = new servicesHttp();
        this.connectSuccess = this.connectSuccess.bind(this);
        this.disconnectSuccess = this.disconnectSuccess.bind(this);

        this.chargerPlayersSuccess = this.chargerPlayersSuccess.bind(this);
        this.chargerPlayersError = this.chargerPlayersError.bind(this);

        this.chargerMatchsSuccess = this.chargerMatchsSuccess.bind(this);
        this.chargerMatchsError = this.chargerMatchsError.bind(this);

        this.chargerMatchsForSelectionSuccess = this.chargerMatchsForSelectionSuccess.bind(this);
        this.chargerMatchsForSelectionError = this.chargerMatchsForSelectionError.bind(this);

        this.chargerRecesSuccess = this.chargerRecesSuccess.bind(this);
        this.chargerRecesError = this.chargerRecesError.bind(this);

        this.chargerAngriffsSuccess = this.chargerAngriffsSuccess.bind(this);
        this.chargerAngriffsError = this.chargerAngriffsError.bind(this);

        this.updateAngriffsSuccess = this.updateAngriffsSuccess.bind(this);
        this.updateAngriffsError = this.updateAngriffsError.bind(this);
    }

    connectSuccess(data) {
        console.log("connectSuccess called");
        if ($(data).find("success").text() === 'true') {
            console.log($(data));

            Toastify({
                text: "Login successful",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#33cc33"
            }).showToast();

            window.location.href = "../html/home.html";
        } else {
            Toastify({
                text: "Login failed. Incorrect username or password.",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ff3333"
            }).showToast();
        }
    }

    disconnectSuccess() {
        Toastify({
            text: "User disconnected",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#33cc33"
        }).showToast();
        window.location.href = "../login.html";
    }

    CallbackError(error) {
        console.error("Error:", error);
        Toastify({
            text: "Error: " + error,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff3333"
        }).showToast();
    }


    chargerPlayersSuccess(data){   
      var txtplayer = '';
      //var receRows = '';
      //var angriffRows = '';
      

      $(data).find("players").each(function() {
        var players = new Players();

        players.setPk($(this).find("pk_player").text());
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
        //For playersStatsToAddOrModify
        //receRows += "<tr><td>" +players.getName() + " " + players.getFamilyName() +"</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //angriffRows += "<tr><td>" +players.getName() + " " + players.getFamilyName() + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";

        // Generate the HTML for each player card dynamically
        var playerImage = "../images/Team_individual_image/" + players.getSpielerKarte() + ".jpg";
        var playerCardHTML = `
        <div class="player-card">
            <div class="player-avatar">
                <img src="${playerImage}" alt="${players.getName()}">
            </div>
            <h3>${players.getName()} ${players.getFamilyName()}</h3>
            <button class="login-btn btnChosePlayer" 
                    data-image="${playerImage}" 
                    data-pk="${players.getPk()}">
                <a href="../html/playersStatsafterSelection.html">View Stats</a>
            </button>
        </div>
    `;
    $(".players-grid").append(playerCardHTML);

      
    });

  
    var tableContentPlayers = document.getElementById("tableContentPlayers");
    if (tableContentPlayers) {
      tableContentPlayers.innerHTML = txtplayer;
      console.log("Player Data Received:", data);
    }

  /*
  For playersStatsToAddOrModify
  var receTableModify = document.getElementById("tableContentReceModify");
  if (receTableModify) {
    receTableModify.innerHTML = receRows;
  }

  var angriffTableModify = document.getElementById("tableContentAngriffModify");
  if (angriffTableModify) {
    angriffTableModify.innerHTML = angriffRows;
  }
    */
}


    chargerPlayersError(error) {
      alert("Erreur lors de la lecture des players: " + error);
    }



    chargerMatchsSuccess(data){   
      var tableContentMatches = document.getElementById("tableContentMatches");
      
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
        
          txtmatches += "<tr><td>" + matchs.getWochentag() + " " + matchs.getDatum() + " " + matchs.getMatchZeit() + "</td><td>VS. " + matchs.getFK_Enemy_Team() + ", IN: " + matchs.getHalle() + "</td></tr>";
        });  
        
        if (tableContentMatches) {
          tableContentMatches.innerHTML = txtmatches;
        }
    }

    chargerMatchsError(error) {
    alert("Erreur lors de la lecture des matchs: " + error);
    }

    chargerMatchsForSelectionSuccess(data){   
      var cmbAfterSelectionMatches = document.getElementById("cmbAfterSelectionMatches");
      var option = '';
      //var dateMatchAfterSelection = document.getElementById("dateMatchAfterSelection");
      //var teamMatchAfterSelection = document.getElementById("teamMatchAfterSelection");

      
      
        $(data).find("matchs").each(function() {
          var matchs = new Matchs();
          matchs.setPk($(this).find("pk_matchs").text());
          matchs.setSpiel($(this).find("spiel").text());
          //matchs.setDatum($(this).find("datum").text());
          //matchs.setFK_Enemy_Team($(this).find("fk_Enemy_Team").text());
        
          /*let matchOption = new Option(matchs.getSpiel(), JSON.stringify({
            datum: matchs.getDatum(),
            fk_enemy_team: matchs.getFK_Enemy_Team()
          }));*/


          option = new Option(matchs.getSpiel(), JSON.stringify(matchs));
          if (cmbAfterSelectionMatches) {
            cmbAfterSelectionMatches.appendChild(option);
        } else {
            console.error("ComboBox not found in the DOM.");
        }
    });

    /*
    For playersStatsToAddOrModify
    cmbAfterSelectionMatches.addEventListener("change", function () {
      let selectedMatch = JSON.parse(this.value);
  
      if (selectedMatch) {
        dateMatchAfterSelection.value = selectedMatch.datum;
        teamMatchAfterSelection.value = selectedMatch.fk_enemy_team;
      }
    });*/
}

    chargerMatchsForSelectionError(error) {
    alert("Erreur lors de la lecture des matchs: " + error);
    }



    chargerRecesSuccess(data) {   
      var tableContentRecePerMatchPerPlayer = document.getElementById("tableContentRece");

      var txtRecesPerMatchAndPlayer = '';

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

          txtRecesPerMatchAndPlayer += "<tr><td>" + reces.getPerfekt() + "</td><td>" + reces.getSuperInZone() + "</td><td>" + reces.getNeutral() + "</td><td>" + reces.getSchlecht() + "</td><td>" + reces.getDirektFehler() + "</td><td>" + reces.getFalscheEntscheidung() + "</td></tr>";
        });

      if (tableContentRecePerMatchPerPlayer) {
        tableContentRecePerMatchPerPlayer.innerHTML = txtRecesPerMatchAndPlayer;
        console.log("tableContentRecePerMatchPerPlayer found: " + txtRecesPerMatchAndPlayer);
      }else{
        console.log("tableContentRecePerMatchPerPlayer not found");
      }

    }

    chargerRecesError(error) {
      alert("Erreur lors de la lecture des reces: " + error);
    }




    chargerAngriffsSuccess(data) {   
      var tableContentAngriffPerMatchPerPlayer = document.getElementById("tableContentAngriff");
      var txtAngriffsPerMatchAndPlayer = '';

      $(data).find("angriffs").each(function() {
          var angriffs = new Angriffs();
          angriffs.setPk($(this).find("pk_angriff").text());
          angriffs.setFK_Match_Angriff($(this).find("fk_match_angriff").text());
          angriffs.setFK_Player_Angriff($(this).find("fk_player_angriff").text());
          angriffs.setBalleErhalten($(this).find("balleErhalten").text());
          angriffs.setPunkte($(this).find("punkte").text());
          angriffs.setDruckvoll($(this).find("druckvoll").text());
          angriffs.setZuEasy($(this).find("zuEasy").text());
          angriffs.setFehler($(this).find("fehler").text());
          angriffs.setBlockPunkt($(this).find("blockPunkt").text());
          angriffs.setBlock($(this).find("block").text());
          angriffs.setAss($(this).find("ass").text());

          txtAngriffsPerMatchAndPlayer += `
              <tr data-id="${angriffs.getPk()}">
                <td contenteditable="true">${angriffs.getBalleErhalten()}</td>
                <td contenteditable="true">${angriffs.getPunkte()}</td>
                <td contenteditable="true">${angriffs.getDruckvoll()}</td>
                <td contenteditable="true">${angriffs.getZuEasy()}</td>
                <td contenteditable="true">${angriffs.getFehler()}</td>
                <td contenteditable="true">${angriffs.getBlockPunkt()}</td>
                <td contenteditable="true">${angriffs.getBlock()}</td>
                <td contenteditable="true">${angriffs.getAss()}</td>
              </tr>
              <td><button class="updateAngriffBtn">Update</button></td>`;        
      });

      if (tableContentAngriffPerMatchPerPlayer) {
        tableContentAngriffPerMatchPerPlayer.innerHTML = txtAngriffsPerMatchAndPlayer;
        
        console.log("tableContentAngriffPerMatchPerPlayer found: " + txtAngriffsPerMatchAndPlayer);
      }else{
        console.log("tableContentAngriffPerMatchPerPlayer not found");
      }

    }

    chargerAngriffsError(error) {
      alert("Erreur lors de la lecture des angriff: " + error);
    }


    updateAngriff(angriffData) {
      this.http.updateAngriff(
          angriffData,
          this.updateAngriffsSuccess,
          this.updateAngriffsError
      );
  }

    updateAngriffsSuccess(response) {
      console.log("Angriffs updated successfully:", response);

    }
  
    updateAngriffsError(error) {
      console.error("Error updating Angriffs:", error);
    }

}



    $(document).ready(function () {
      window.ctrl = new IndexCtrl();
      var cmbmatchs = $("#cmbAfterSelectionMatches");
      var matchPk = '';
      var playerPk = '';

      window.ctrl.http.getMatchs(window.ctrl.chargerMatchsSuccess, window.ctrl.chargerMatchsError);
      window.ctrl.http.getPlayers(window.ctrl.chargerPlayersSuccess, window.ctrl.chargerPlayersError);
      window.ctrl.http.getMatchs(window.ctrl.chargerMatchsForSelectionSuccess, window.ctrl.chargerMatchsForSelectionError);

      cmbmatchs.change(function(event) {
        //let selectedMatch = JSON.parse(this.options[this.selectedIndex].value);
        matchPk = JSON.parse(this.options[this.selectedIndex].value).pk;
        playerPk = localStorage.getItem("selectedPlayerFK");
        //$("#dateMatchAfterSelection").val(selectedMatch.datum);
        //$("#enemyTeamMatchAfterSelection").val(selectedMatch.fk_Enemy_Team);

        console.log("Selected Match PK:", matchPk);
        console.log("Retrieved Player PK from localStorage:", playerPk);

        window.ctrl.http.getReces(matchPk, playerPk, window.ctrl.chargerRecesSuccess, window.ctrl.chargerRecesError);
        window.ctrl.http.getAngriffs(matchPk, playerPk, window.ctrl.chargerAngriffsSuccess, window.ctrl.chargerAngriffsError);
      });


      $("#loginForm").on("submit", function(event) {
          event.preventDefault();
          var username = $("#username").val();
          var password = $("#password").val();
          console.log("Form submitted");
          console.log("Sending username:", username, "and password:", password);
          window.ctrl.http.connect(username, password, window.ctrl.connectSuccess, window.ctrl.CallbackError);
      });


      $(document).on("click", ".btnChosePlayer", function (event) {
        event.preventDefault();
    
        var playerImage = $(this).data("image");
        var playerFK = $(this).data("pk"); // Ensure correct retrieval
    
        localStorage.setItem("selectedPlayerImage", playerImage);
        localStorage.setItem("selectedPlayerFK", playerFK);

        window.location.href = "../html/playersStatsafterSelection.html";
    });
    
    // Retrieve playerPK correctly when needed
    $(document).ready(function () {
        var storedPlayerPk = localStorage.getItem("selectedPlayerFK");
        if (storedPlayerPk) {
            console.log("Retrieved Player PK from localStorage:", storedPlayerPk);
        }
    });
    

    if ($(".chosen-player-card-image").length > 0) {
      var storedImage = localStorage.getItem("selectedPlayerImage");
      if (storedImage) {
          $(".chosen-player-card-image").html(`<img src="${storedImage}" alt="Player Card" class="playersImageAfterSelection">`);
      }
    }


    $(document).on("click", ".updateAngriffBtn", function (event) {
    let row = $(this).closest("tr");
    let angriffData = {
        pk_angriff: row.data("id"),
        balleErhalten: row.find("td:eq(0)").text(),
        punkte: row.find("td:eq(1)").text(),
        druckvoll: row.find("td:eq(2)").text(),
        zuEasy: row.find("td:eq(3)").text(),
        fehler: row.find("td:eq(4)").text(),
        blockPunkt: row.find("td:eq(5)").text(),
        block: row.find("td:eq(6)").text(),
        ass: row.find("td:eq(7)").text()
    };

    window.ctrl.updateAngriff(angriffData);
});


    });

