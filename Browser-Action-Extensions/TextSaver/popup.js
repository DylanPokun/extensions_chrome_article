$(function () {
  /** Fonction d'update de la liste */
  function updateTextList() {
    // Nettoyage initial de la liste de textes
    $('#textList').empty();
    // Récupération de la liste dans le Chrome Storage
    chrome.storage.sync.get(['textList'], function (data) {
      // Pour chaque élément : créer le <li> contenant la valeur et la <button> de suppression de la valeur
      data.textList.forEach((t, i) => {
        // Identifiants HTML du <li> et du <button>
        const txtId = 'saved-txt-' + i;
        const btnId = "btn-" + txtId;
        // Construction des éléments HTML
        $('#textList').append('<li id="' + txtId + '">' + t + '<button type="button" class="close" id="' + btnId + '"><span>&times;</span></button></li>');
        // Mécanisme de suppression du nouvel élément en cas de clic
        $("#" + btnId).click(function () {
          // Suppression de l'élément dans l'array
          data.textList.splice(i, 1);
          // Remplacement de l'array en BDD et callback function soulevant une notification
          chrome.storage.sync.set({ 'textList': data.textList }, function () {
            // Options de la notification
            var notifOptions = {
              type: 'basic', // Il en existe d'avantage mais nous resterons "basic" ici
              iconUrl: 'icon48.png',
              title: 'Suppression d\'élément',
              message: '"' + t + '" a été supprimé'
            };
            // Déclenchement de la notification
            chrome.notifications.create(/*id*/ 'txtDelNotif', notifOptions);
            // Update de la liste
            updateTextList();
          });
        })
      });
    })
  }

  // Initialisation de la liste
  updateTextList();

  /** Lors du clic sur le boutton "randomText" */
  $('#randomText').click(function () {
    //Chrome API
    chrome.storage.sync.get(['textList'],
      function (data) {
        // Initialisation de l'array en cas de donnée inexistante
        data.textList = data.textList || [];
        // Ajout d'un élément aléatoire dans la liste
        data.textList.push("" + Math.floor(Math.random() * 10000000000000));
        // Enregistrement de la nouvelle liste dans le Chrome Storage
        chrome.storage.sync.set({ 'textList': data.textList }, function () {
          // Options de la notification
          var notifOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Ajout d\'élément',
            message: '"' + data.textList[data.textList.length - 1] + '" a été ajouté'
          }
          chrome.notifications.create(/*id*/ 'txtAddedNotif', notifOptions);
          updateTextList();
        });
      });
  });
});
