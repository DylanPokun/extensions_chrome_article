// Déclaration de l'objet du ContextMenu
const contextMenuItem = {
  "id": "textSaverExtension",
  "title": "Copier dans TextSaver",
  "contexts": ["selection"] // Il y en a d'autres comme video etc.
};

// Ajout de l'objet précédent au ContextMenu
chrome.contextMenus.create(contextMenuItem);

// Ajout d'un listener sur l'évènement de clic dans le ContextMenu
chrome.contextMenus.onClicked.addListener(function (clickData) {
  // Si l'élément cliqué dans le ContextMenu est notre élément et que du texte est sélectionné : nous copions
  if (clickData.menuItemId == contextMenuItem.id && clickData.selectionText) {
    // Chrome API
    chrome.storage.sync.get(['textList'],
      function (data) {
        // Initialisation de l'array
        data.textList = data.textList || [];
        // Ajout de l'élément sélectionné à la liste
        data.textList.push(clickData.selectionText);
        // Enregistrement dans le Chrome Storage et notification en callback function
        chrome.storage.sync.set({ 'textList': data.textList }, function () {
          var notifOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Ajout d\'élément',
            message: '"' + data.textList[data.textList.length - 1] + '" a été ajouté'
          };
          chrome.notifications.create(/*id*/ 'txtAddedNotif', notifOptions);
        });
      });
  }
})

// Ajout d'un listener de changements sur le Chrome Storage
chrome.storage.onChanged.addListener(function (changes, storageName) {
  // Si les changements dans le storage concernent la "textList"
  if (changes.textList) {
    // Les changements s'affichent sous la forme {newValue: ***, oldValue: ***}
    chrome.browserAction.setBadgeText({ "text": changes.textList.newValue.length.toString() });
  }
})