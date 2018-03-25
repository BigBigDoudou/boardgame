// Actions initiales

$(window).on("load", function () {

    // Masquer les éléments
    
    $("#global-wrapper").hide();
    $("#informations").hide();
    $("#end-mask").hide();
    $("#fight-mask").hide();
    $("#round").hide();

    // Si la largeur de fenêtre est inférieure à 1400px, fermer le panneau latéral
    
    if ($(window).width() < 1400) {
        informationsToggle();
    }

})

// [Fonction] Ouverture / fermeture dynamique du panneau latéral lors d'une modification de la largeur de la fenêtre

$(window).on("resize", debounce(function () { // utiliser la fonction "debounce" pour éviter la surcharge lorsque la taille de fenêtre est réduite manuellement
    if ($(window).width() < 1400) {
        informationsClose();
    } else {
        informationsOpen();
    }
}, 50)); // définir le délai de calcul à 50ms

// [Fonction] Lancement d'une première partie

$("#first-game").on("click", function () {
    $("#rules").remove();
    $("#global-wrapper").show();
    $("#informations").show();
    newGame();
});

// [Fonction] Lancement d'une nouvelle partie

$("#new-game").on("click", function () {
    newGame();
});
