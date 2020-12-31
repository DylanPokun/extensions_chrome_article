$(function () {
  $('#tri-alpha').click(function () {
    chrome.storage.sync.get(['textList'], function (data) {
      data.textList.sort();
      chrome.storage.sync.set({ 'textList': data.textList }, function () {
        var notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Tri alphabétique croissant',
          message: "La liste a été triée alphabétiquement"
        };
        chrome.notifications.create(/*id*/ 'triAlpha', notifOptions);
      });
    })
  });

  $('#tri-long').click(function () {
    chrome.storage.sync.get(['textList'], function (data) {
      data.textList.sort(function (a, b) {
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return b.length - a.length;
      });
      chrome.storage.sync.set({ 'textList': data.textList }, function () {
        var notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Tri en longueur décroissant',
          message: "La liste a été triée par longueur décroissante"
        };
        chrome.notifications.create(/*id*/ 'triLong', notifOptions);
      });
    })
  });

  $('#reset').click(function () {
    chrome.storage.sync.set({ 'textList': [] }, function () {
      var notifOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Tout supprimer',
        message: 'Tout a été supprimé'
      };
      chrome.notifications.create(/*id*/ 'supprimerTout', notifOptions);
    });
  });
});
