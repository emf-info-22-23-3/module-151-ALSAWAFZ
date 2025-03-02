/**
 * Class representing HTTP services for interacting with the server.
 */
class servicesHttp {
  /**
   * Creates an instance of servicesHttp and sets the base server URL.
   */
  constructor() {
    this.BASE_URL = "../../server/server.php";
  }

  /**
   * Sends a login request to the server.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
   */
  connect(username, password, successCallback, errorCallback) {
    console.log("Sending data to server:", { username, password });

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
   * Sends a logout request to the server.
   *
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
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
   * Fetches a list of matches from the server.
   *
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
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
   * Fetches a list of players from the server.
   *
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
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
   * Fetches reception data for a specific match and player from the server.
   *
   * @param {string} matchPk - The primary key of the match.
   * @param {string} playerPk - The primary key of the player.
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
   */
  getReces(matchPk, playerPk, successCallback, errorCallback) {
    console.log("Sending getReces request with:", { matchPk, playerPk });

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
   * Fetches attack data for a specific match and player from the server.
   *
   * @param {string} matchPk - The primary key of the match.
   * @param {string} playerPk - The primary key of the player.
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
   */
  getAngriffs(matchPk, playerPk, successCallback, errorCallback) {
    console.log("Sending getAngriffs request with:", { matchPk, playerPk });

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
   * Sends an update request for attack data to the server.
   *
   * @param {Object} data - The data object containing attack details.
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
   */
  updateAngriffs(data, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "xml",
      url: this.BASE_URL,
      data: $.param(data),
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Sends an update request for reception data to the server.
   *
   * @param {Object} data - The data object containing reception details.
   * @param {Function} successCallback - The callback function executed on success.
   * @param {Function} errorCallback - The callback function executed on error.
   */
  updateReces(data, successCallback, errorCallback) {
    $.ajax({
      type: "PUT",
      dataType: "xml",
      url: this.BASE_URL,
      data: $.param(data),
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Adds new reception data to the server.
   */
  addReces(data, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: this.BASE_URL,
      data: $.param(data),
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Adds new attack data to the server.
   */
  addAngriffs(data, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: this.BASE_URL,
      data: $.param(data),
      success: successCallback,
      error: errorCallback,
    });
  }
}
