$(function () {
  $('#tri-alpha').click(function () {
    chrome.storage.sync.get(['textList'], function (data) {
      data.textList.sort();
      chrome.storage.sync.set({ 'textList': data.textList }, function () {
        var notifOptions = {
          type: 'basic',
          iconUrl: 'icon48.png',
          title: 'Tri alphab�tique croissant',
          message: "La liste a �t� tri�e alphab�tiquement"
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
          title: 'Tri en longueur d�croissant',
          message: "La liste a �t� tri�e par longueur d�croissante"
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
        message: 'Tout a �t� supprim�'
      };
      chrome.notifications.create(/*id*/ 'supprimerTout', notifOptions);
    });
  });
});
