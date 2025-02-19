var BASE_URL = "../../server/";

function chargerMatchs(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "matchManager.php",
    success: successCallback,
    error: errorCallback
  });
}


function chargerPlayers(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "playerManager.php",
    success: successCallback,
    error: errorCallback
  });
}

function chargerReces(matchid, playerid, successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "receManager.php",
    data:'matchid=' + matchid,
    data:'playerid='+ playerid,
    success: successCallback,
    error: errorCallback
  });
}