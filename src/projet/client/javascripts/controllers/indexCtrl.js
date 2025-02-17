
function chargerMatchsSuccess(data, text, jqXHR)
{   
    $.each(data, function(index, matchs) {
      var row = '<tr><td>' + matchs.id + '</td><td>' + matchs.spiel + '</td></tr>';
      $('#match-plan tbody').append(row);
  });
}

function chargerMatchsError(request, status, error) {
  alert("Erreur lors de la lecture des matchs: " + error);
}


$(document).ready(function() {
  $.getScript("javascripts/helpers/dateHelper.js", function() {
    console.log("dateHelper.js chargé !");
  });
  $.getScript("javascripts/services/servicesHttp.js", function() {
    console.log("servicesHttp.js chargé !");
    chargerMatchs(chargerMatchsSuccess, chargerMatchsError);
  });
});

