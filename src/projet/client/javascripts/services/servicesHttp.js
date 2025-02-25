class servicesHttp {
  constructor() {
    // Base URL of the server API
    this.BASE_URL = "http://localhost:8080/projet/server/server.php";
  }

  /**
   * Logs in a user.
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  connect(username, password, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: this.BASE_URL,
      data: {
        action: "login",
        username: username,
        password: password,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Logs out the current user.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  disconnect(successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: this.BASE_URL,
      data: { action: "disconnect" },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Retrieves all matches.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  getMatchs(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: this.BASE_URL,
      data: { action: "getMatchs" },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Retrieves all players.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  getPlayers(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: this.BASE_URL,
      data: { action: "getPlayers" },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Retrieves reception statistics for a player in a match.
   * @param {number} matchPk - Match ID.
   * @param {number} playerPk - Player ID.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  getReces(matchPk, playerPk, successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: this.BASE_URL,
      data: {
        action: "getRece",
        matchPk: matchPk,
        playerPk: playerPk,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Retrieves attack statistics for a player in a match.
   * @param {number} matchPk - Match ID.
   * @param {number} playerPk - Player ID.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  getAngriffs(matchPk, playerPk, successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: this.BASE_URL,
      data: {
        action: "getAngriff",
        matchPk: matchPk,
        playerPk: playerPk,
      },
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Updates an Angriff (attack) record.
   * @param {Object} data - Angriff data object.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  updateAngriffs(data, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "xml",
      url: this.BASE_URL,
      data: data, // Sending data directly
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Updates a Rece (reception) record.
   * @param {Object} data - Rece data object.
   * @param {function} successCallback - Function to call on success.
   * @param {function} errorCallback - Function to call on error.
   */
  updateReces(data, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "xml",
      url: this.BASE_URL,
      data: data, // Sending data directly
      success: successCallback,
      error: errorCallback,
    });
  }
}
