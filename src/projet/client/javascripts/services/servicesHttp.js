/*
 * Couche de services HTTP (worker).
 *
 */
var BASE_URL = "../server";

/**
 * Fonction permettant de demander la liste des pays au serveur.
 * @param {type} Fonction de callback lors du retour avec succès de l'appel.
 * @param {type} Fonction de callback en cas d'erreur.
 */
function chargerMatchs(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "matchManager.php",
    success: successCallback,
    error: errorCallback
  });
}

