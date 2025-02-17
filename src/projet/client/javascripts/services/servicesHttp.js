var BASE_URL = "../server";

function chargerMatchs(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "matchManager.php",
    success: successCallback,
    error: errorCallback
  });
}

