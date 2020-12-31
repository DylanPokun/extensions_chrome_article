// Tout code ajouté ici se lancera dans le contexte de la page (manipulez donc à votre guise)

// Nécessaire à l'affichage de popup.html
chrome.runtime.sendMessage({todo: "showPageAction"});

// Listener pour le message de popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.todo == "changeColor"){
    var newColor = '#' + request.clickedColor;
    // Applique le style "color = newColor" à tous les éléments
    document.querySelectorAll("*").forEach(el => el.style.color = newColor);
  }
});
