var menuItem = {
    "id":"lire",
    "title": "Lire à haute voix",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(e){
    if(e.menuItemId == "lire" && e.selectionText){
        chrome.tts.speak(e.selectionText, {'rate':1.5});
    }
});