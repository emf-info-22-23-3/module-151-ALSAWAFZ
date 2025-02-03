var BASE_URL = "../server/server.php";

function chargerTeam(successCallback, errorCallback) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: BASE_URL,
        data: 'action=equipe',
        success: successCallback,
        error: errorCallback
    });
}