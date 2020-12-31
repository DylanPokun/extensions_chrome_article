$(function () {
  // Récupération de la couleur sélectionnée
  var color = $('#fontColor').val();
  $('#fontColor').on("change paste keyup", function () {
    color = $(this).val();
  });

  // En cas de click sur #btnChange : envoyer le Message "changeColor" avec l'information de la couleur sélectionnée
  $('#btnChange').click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", clickedColor: color });
    });
  });
});
