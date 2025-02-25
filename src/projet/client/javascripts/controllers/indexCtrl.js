/**
 * Class IndexCtrl
 *
 * This class acts as the main controller for the client-side of the application.
 * It manages interactions between the views and the server, handling communication
 * via HTTP requests through the `servicesHttp` service.
 */
class IndexCtrl {
  /**
   * Constructor for IndexCtrl
   *
   * Initializes the HTTP service and binds methods to ensure proper `this` context.
   */
  constructor() {
    this.http = new servicesHttp(); // Instance of servicesHttp for server communication

    // Binding methods to ensure the correct context
    this.connectSuccess = this.connectSuccess.bind(this);
    this.disconnectSuccess = this.disconnectSuccess.bind(this);

    this.chargerPlayersSuccess = this.chargerPlayersSuccess.bind(this);
    this.chargerPlayersError = this.chargerPlayersError.bind(this);

    this.chargerMatchsSuccess = this.chargerMatchsSuccess.bind(this);
    this.chargerMatchsError = this.chargerMatchsError.bind(this);

    this.chargerMatchsForSelectionSuccess =
      this.chargerMatchsForSelectionSuccess.bind(this);
    this.chargerMatchsForSelectionError =
      this.chargerMatchsForSelectionError.bind(this);

    this.chargerRecesSuccess = this.chargerRecesSuccess.bind(this);
    this.chargerRecesError = this.chargerRecesError.bind(this);

    this.chargerAngriffsSuccess = this.chargerAngriffsSuccess.bind(this);
    this.chargerAngriffsError = this.chargerAngriffsError.bind(this);

    this.updateAngriffSuccess = this.updateAngriffSuccess.bind(this);
    this.updateAngriffError = this.updateAngriffError.bind(this);
    this.updateAngriffdata = this.updateAngriffdata.bind(this);

    this.updateReceSuccess = this.updateReceSuccess.bind(this);
    this.updateReceError = this.updateReceError.bind(this);
    this.updateRecedata = this.updateRecedata.bind(this);
  }

  /**
   * Handles successful user connection
   *
   * @param {Object} data - The response data received from the server
   */
  connectSuccess(data) {
    console.log("connectSuccess called");

    // Check if login was successful
    if ($(data).find("success").text() === "true") {
      const username = $(data).find("username").text();
      localStorage.setItem("username", username); // Store username in local storage

      // Display success notification
      Toastify({
        text: "Login successful",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#33cc33",
      }).showToast();

      // Redirect to the home page
      window.location.href = "../html/home.html";

      console.log($(data));
    } else {
      // Display failure notification
      Toastify({
        text: "Login failed. Incorrect username or password.",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ff3333",
      }).showToast();
    }
  }

  /**
   * Handles user disconnection
   */
  disconnectSuccess() {
    localStorage.removeItem("username"); // Remove username from local storage

    // Display disconnection notification
    Toastify({
      text: "User disconnected",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#33cc33",
    }).showToast();

    // Redirect to login page
    window.location.href = "../html/login.html";
  }

  /**
   * Handles generic error responses
   *
   * @param {Object} error - The error message or object
   */
  callbackError(error) {
    console.error("Error:", error);

    // Display error notification
    Toastify({
      text: "Error: " + error,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#ff3333",
    }).showToast();
  }

  /**
   * Handles the successful retrieval of player data
   *
   * @param {Object} data - XML data containing player information
   */
  chargerPlayersSuccess(data) {
    var txtplayer = "";

    $(data)
      .find("players")
      .each(function () {
        var players = new Players();

        // Extracting and setting player attributes from XML
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

        // Generating HTML table row for player data
        txtplayer +=
          "<tr><td>" +
          players.getSpielerNr() +
          "</td><td>" +
          players.getName() +
          "</td><td>" +
          players.getFamilyName() +
          "</td><td>" +
          players.getAdresse() +
          "</td><td>" +
          players.getFk_place() +
          "</td><td>" +
          players.getNatel() +
          "</td><td>" +
          players.getEmail() +
          "</td><td>" +
          players.getGeburstag() +
          "</td><td>" +
          players.getLizenz() +
          "</td><td>" +
          players.getSchreiber() +
          "</td><td>" +
          players.getSchiri() +
          "</td><td>" +
          players.getJS() +
          "</td></tr>";

        // Creating player cards dynamically
        var playerImage =
          "../images/Team_individual_image/" +
          players.getSpielerKarte() +
          ".jpg";
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

        // Append player card to the grid
        $(".players-grid").append(playerCardHTML);
      });

    // Inject generated HTML into the players table
    var tableContentPlayers = document.getElementById("tableContentPlayers");
    if (tableContentPlayers) {
      tableContentPlayers.innerHTML = txtplayer;
      console.log("Player Data Received:", data);
    }
  }

  /**
   * Handles errors while retrieving player data
   *
   * @param {Object} error - Error message or object
   */
  chargerPlayersError(error) {
    alert("Erreur lors de la lecture des players: " + error);
  }

  /**
   * Handles the successful retrieval of match data.
   * Populates the matches table with the retrieved data.
   *
   * @param {XMLDocument} data - The XML data containing match information.
   */
  chargerMatchsSuccess(data) {
    var tableContentMatches = document.getElementById("tableContentMatches");

    var txtmatches = "";
    $(data)
      .find("matchs")
      .each(function () {
        var matchs = new Matchs();
        matchs.setPk($(this).find("pk_matchs").text());
        matchs.setSpiel($(this).find("spiel").text());
        matchs.setWochentag($(this).find("wochentag").text());
        matchs.setDatum($(this).find("datum").text());
        matchs.setMatchZeit($(this).find("matchZeit").text());
        matchs.setFK_Enemy_Team($(this).find("fk_enemy_team").text());
        matchs.setHalle($(this).find("halle").text());

        // Construct table row with match details
        txtmatches +=
          "<tr><td>" +
          matchs.getWochentag() +
          " " +
          matchs.getDatum() +
          " " +
          matchs.getMatchZeit() +
          "</td><td>VS. " +
          matchs.getFK_Enemy_Team() +
          ", IN: " +
          matchs.getHalle() +
          "</td></tr>";
      });

    if (tableContentMatches) {
      tableContentMatches.innerHTML = txtmatches;
    }
  }

  /**
   * Handles errors occurring while retrieving match data.
   *
   * @param {string} error - The error message.
   */
  chargerMatchsError(error) {
    alert("Erreur lors de la lecture des matchs: " + error);
  }

  /**
   * Handles the successful retrieval of match data for selection.
   * Populates the match selection dropdown and updates related fields.
   *
   * @param {XMLDocument} data - The XML data containing match information.
   */
  chargerMatchsForSelectionSuccess(data) {
    var cmbAfterSelectionMatches = document.getElementById(
      "cmbAfterSelectionMatches"
    );
    var dateMatchAfterSelection = document.getElementById(
      "dateMatchAfterSelection"
    );
    var teamMatchAfterSelection = document.getElementById(
      "teamMatchAfterSelection"
    );

    if (!cmbAfterSelectionMatches) {
      return;
    }

    var option = "";
    cmbAfterSelectionMatches.innerHTML = "";
    $(data)
      .find("matchs")
      .each(function () {
        var matchs = new Matchs();
        matchs.setPk($(this).find("pk_matchs").text());
        matchs.setSpiel($(this).find("spiel").text());
        matchs.setDatum($(this).find("datum").text());
        matchs.setFK_Enemy_Team($(this).find("fk_enemy_team").text());

        // Create new option for match selection
        option = new Option(matchs.getSpiel(), JSON.stringify(matchs));
        cmbAfterSelectionMatches.appendChild(option);
      });

    // Event listener to update fields when a match is selected
    cmbAfterSelectionMatches.addEventListener("change", function () {
      let selectedMatch = JSON.parse(this.value);
      console.log("Selected Match:", selectedMatch); // Debugging

      if (dateMatchAfterSelection) {
        dateMatchAfterSelection.value = selectedMatch.datum || "N/A";
      } else {
        console.error("Date input not found.");
      }

      if (teamMatchAfterSelection) {
        teamMatchAfterSelection.value = selectedMatch.fk_Enemy_Team || "N/A";
      } else {
        console.error("Team input not found.");
      }
    });
  }

  /**
   * Handles errors occurring while retrieving match data for selection.
   *
   * @param {string} error - The error message.
   */
  chargerMatchsForSelectionError(error) {
    alert("Erreur lors de la lecture des matchs: " + error);
  }

  /**
   * Handles the successful retrieval of reception statistics.
   * Populates the table with reception data for each match and player.
   *
   * @param {XMLDocument} data - The XML data containing reception statistics.
   */
  chargerRecesSuccess(data) {
    var tableContentRecePerMatchPerPlayer =
      document.getElementById("tableContentRece");
    var txtRecesPerMatchAndPlayer = "";

    $(data)
      .find("reces")
      .each(function () {
        var reces = new Reces();
        reces.setPk($(this).find("pk_rece").text());
        reces.setFK_Player_Rece($(this).find("fk_player_rece").text());
        reces.setFK_Match_Rece($(this).find("fk_match_rece").text());
        reces.setPerfekt($(this).find("perfekt").text());
        reces.setSuperInZone($(this).find("superInZone").text());
        reces.setNeutral($(this).find("neutral").text());
        reces.setSchlecht($(this).find("schlecht").text());
        reces.setDirektFehler($(this).find("direktFehler").text());
        reces.setFalscheEntscheidung(
          $(this).find("falscheEntscheidung").text()
        );

        localStorage.setItem("selectedPkRece", reces.getPk());

        // Construct table row with reception statistics
        txtRecesPerMatchAndPlayer += `
            <tr>
              <td contenteditable="true" id="recePerfekt">${reces.getPerfekt()}</td>
              <td contenteditable="true" id="receSuperInZone">${reces.getSuperInZone()}</td>
              <td contenteditable="true" id="receNeutral">${reces.getNeutral()}</td>
              <td contenteditable="true" id="receSchlecht">${reces.getSchlecht()}</td>
              <td contenteditable="true" id="receDirektFehler">${reces.getDirektFehler()}</td>
              <td contenteditable="true" id="receFalscheEntscheidung">${reces.getFalscheEntscheidung()}</td>
            </tr>`;
      });

    if (tableContentRecePerMatchPerPlayer) {
      tableContentRecePerMatchPerPlayer.innerHTML = txtRecesPerMatchAndPlayer;
    } else {
      console.log("tableContentRecePerMatchPerPlayer not found");
    }
  }

  /**
   * Handles errors occurring while retrieving reception statistics.
   *
   * @param {string} error - The error message.
   */
  chargerRecesError(error) {
    alert("Erreur lors de la lecture des reces: " + error);
  }

  /**
   * Handles the successful retrieval of attack statistics.
   * Populates the table with attack data for each match and player.
   *
   * @param {XMLDocument} data - The XML data containing attack statistics.
   */
  chargerAngriffsSuccess(data) {
    var tableContentAngriffPerMatchPerPlayer = document.getElementById(
      "tableContentAngriff"
    );
    var txtAngriffsPerMatchAndPlayer = "";

    $(data)
      .find("angriffs")
      .each(function () {
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

        localStorage.setItem("selectedPkAngriff", angriffs.getPk());

        // Construct table row with attack statistics
        txtAngriffsPerMatchAndPlayer += `
            <tr>
              <td contenteditable="true" id="angriffBalleErhalten">${angriffs.getBalleErhalten()}</td>
              <td contenteditable="true" id="angriffPunkte">${angriffs.getPunkte()}</td>
              <td contenteditable="true" id="angriffDruckvoll">${angriffs.getDruckvoll()}</td>
              <td contenteditable="true" id="angriffZuEasy">${angriffs.getZuEasy()}</td>
              <td contenteditable="true" id="angriffFehler">${angriffs.getFehler()}</td>
              <td contenteditable="true" id="angriffBlockPunkt">${angriffs.getBlockPunkt()}</td>
              <td contenteditable="true" id="angriffBlock">${angriffs.getBlock()}</td>
              <td contenteditable="true" id="angriffAss">${angriffs.getAss()}</td>
            </tr>`;
      });

    if (tableContentAngriffPerMatchPerPlayer) {
      tableContentAngriffPerMatchPerPlayer.innerHTML =
        txtAngriffsPerMatchAndPlayer;
    }
  }

  /**
   * Handles errors occurring while retrieving attack statistics.
   *
   * @param {string} error - The error message.
   */
  chargerAngriffsError(error) {
    alert("Erreur lors de la lecture des angriff: " + error);
  }

  /**
   * Gathers and returns Angriff (attack) statistics data from the editable table cells.
   * @returns {Object} An object containing the Angriff statistics for the selected player and match.
   */
  updateAngriffdata() {
    let data = "";
    let pk_angriff = localStorage.getItem("selectedPkAngriff");
    let matchPk = JSON.parse($("#cmbAfterSelectionMatches").val()).pk;
    let playerPk = localStorage.getItem("selectedPlayerFK");

    // Extract values from the row's editable cells
    let balleErhalten = document.getElementById(
      "angriffBalleErhalten"
    ).textContent;
    let punkte = document.getElementById("angriffPunkte").textContent;
    let druckvoll = document.getElementById("angriffDruckvoll").textContent;
    let zuEasy = document.getElementById("angriffZuEasy").textContent;
    let fehler = document.getElementById("angriffFehler").textContent;
    let blockPunkt = document.getElementById("angriffBlockPunkt").textContent;
    let block = document.getElementById("angriffBlock").textContent;
    let ass = document.getElementById("angriffAss").textContent;

    // Prepare the data for the request
    data = {
      pk_angriff: pk_angriff,
      matchPk: matchPk,
      playerPk: playerPk,
      balleErhalten: balleErhalten,
      punkte: punkte,
      druckvoll: druckvoll,
      zuEasy: zuEasy,
      fehler: fehler,
      blockPunkt: blockPunkt,
      block: block,
      ass: ass,
    };
    return data;
  }

  /**
   * Displays a success message when the Angriff table is updated.
   * @param {string} res - Response message from the server.
   */
  updateAngriffSuccess(res) {
    alert("The Angriff table has been updated! " + res);
  }

  /**
   * Displays an error message if updating the Angriff table fails.
   * @param {string} error - Error message.
   */
  updateAngriffError(error) {
    alert("The Angriff table failed to update :( " + error);
  }

  /**
   * Gathers and returns Rece (reception) statistics data from the editable table cells.
   * @returns {Object} An object containing the Rece statistics for the selected player and match.
   */
  updateRecedata() {
    let data = "";
    let pk_rece = localStorage.getItem("selectedPkRece");
    let playerPk = localStorage.getItem("selectedPlayerFK");
    let matchPk = JSON.parse($("#cmbAfterSelectionMatches").val()).pk;

    // Extract values from the row's editable cells
    let perfekt = document.getElementById("recePerfekt").textContent;
    let superInZone = document.getElementById("receSuperInZone").textContent;
    let neutral = document.getElementById("receNeutral").textContent;
    let schlecht = document.getElementById("receSchlecht").textContent;
    let direktFehler = document.getElementById("receDirektFehler").textContent;
    let falscheEntscheidung = document.getElementById(
      "receFalscheEntscheidung"
    ).textContent;

    // Prepare the data for the request
    data = {
      pk_rece: pk_rece,
      playerPk: playerPk,
      matchPk: matchPk,
      perfekt: perfekt,
      superInZone: superInZone,
      neutral: neutral,
      schlecht: schlecht,
      direktFehler: direktFehler,
      falscheEntscheidung: falscheEntscheidung,
    };
    return data;
  }

  /**
   * Displays a success message when the Rece table is updated.
   * @param {string} res - Response message from the server.
   */
  updateReceSuccess(res) {
    alert("The Rece table has been updated! " + res);
  }

  /**
   * Displays an error message if updating the Rece table fails.
   * @param {string} error - Error message.
   */
  updateReceError(error) {
    alert("The Rece table failed to update :( " + error);
  }
}

$(document).ready(function () {
  // Initialize the Index Controller
  window.ctrl = new IndexCtrl();
  var cmbmatchs = $("#cmbAfterSelectionMatches");
  var matchPk = "";
  var playerPk = "";

  // Load matches and players data
  window.ctrl.http.getMatchs(
    window.ctrl.chargerMatchsSuccess,
    window.ctrl.chargerMatchsError
  );
  window.ctrl.http.getPlayers(
    window.ctrl.chargerPlayersSuccess,
    window.ctrl.chargerPlayersError
  );
  window.ctrl.http.getMatchs(
    window.ctrl.chargerMatchsForSelectionSuccess,
    window.ctrl.chargerMatchsForSelectionError
  );

  /**
   * Handles the click event for saving statistics.
   * Updates Angriff and Rece statistics by sending data to the server.
   */
  $(document).on("click", "#saveStats", function (event) {
    event.preventDefault();
    window.ctrl.http.updateAngriffs(
      window.ctrl.updateAngriffdata(),
      window.ctrl.updateAngriffSuccess,
      window.ctrl.updateAngriffError
    );
    window.ctrl.http.updateReces(
      window.ctrl.updateRecedata(),
      window.ctrl.updateReceSuccess,
      window.ctrl.updateReceError
    );
  });

  /**
   * Handles the match selection change event.
   * Fetches Rece and Angriff statistics for the selected match and player.
   */
  cmbmatchs.change(function (event) {
    matchPk = JSON.parse(this.options[this.selectedIndex].value).pk;
    playerPk = localStorage.getItem("selectedPlayerFK");

    window.ctrl.http.getReces(
      matchPk,
      playerPk,
      window.ctrl.chargerRecesSuccess,
      window.ctrl.chargerRecesError
    );
    window.ctrl.http.getAngriffs(
      matchPk,
      playerPk,
      window.ctrl.chargerAngriffsSuccess,
      window.ctrl.chargerAngriffsError
    );
  });

  /**
   * Handles the login form submission.
   * Authenticates the user with the provided username and password.
   */
  $("#loginForm").on("submit", function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log("Form submitted");
    console.log("Sending username:", username, "and password:", password);
    window.ctrl.http.connect(
      username,
      password,
      window.ctrl.connectSuccess,
      window.ctrl.callbackError
    );
  });

  /**
   * Handles player selection.
   * Saves the selected player's image and ID to localStorage and redirects to player stats page.
   */
  $(document).on("click", ".btnChosePlayer", function (event) {
    event.preventDefault();

    var playerImage = $(this).data("image");
    var playerFK = $(this).data("pk"); // Ensure correct retrieval

    localStorage.setItem("selectedPlayerImage", playerImage);
    localStorage.setItem("selectedPlayerFK", playerFK);

    window.location.href = "../html/playersStatsafterSelection.html";
  });

  // Retrieve and log the stored player ID
  $(document).ready(function () {
    var storedPlayerPk = localStorage.getItem("selectedPlayerFK");
    if (storedPlayerPk) {
      console.log("Retrieved Player PK from localStorage:", storedPlayerPk);
    }
  });

  // Load the selected player’s image if available
  if ($(".chosen-player-card-image").length > 0) {
    var storedImage = localStorage.getItem("selectedPlayerImage");
    if (storedImage) {
      $(".chosen-player-card-image").html(
        `<img src="${storedImage}" alt="Player Card" class="playersImageAfterSelection">`
      );
    }
  }
});
