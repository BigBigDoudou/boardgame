// AFFICHAGE DES INFORMATIONS DANS LE PANNEAU LATÉRAL

// [Fonction] Affichage des informations

function informations(info, color) {

    var newInfo = document.createElement("p");
    $(newInfo).text(info);
    $(newInfo).css("color", color);
    $(newInfo).hide();
    $("#informations-logs").append(newInfo);
    $(newInfo).fadeIn();

    infoLines++;

    if (infoLines > 15) {
        $("#informations-logs").find("p:first").remove();
        infoLines--;
    }

}

// [Fonction] Fermeture / ouverture du panneau latéral

function informationsToggle() {

    if (informationsBoard === "open") { // SI le panneau est ouvert

        informationsClose();

    } else if (informationsBoard === "close") {

        informationsOpen();

    }

}

// [Fonction] Fermeture du panneau latéral

function informationsClose() {

    $("#informations").css({
        'width': '40px',
        'padding': '40px 10px'
    });

    $("#informations > p > span:first-child").hide();
    $("#informations-logs").hide();
    $("#informations > hr").hide();

    $("#informations-toggle").css({
        'background-image': 'url(./img/menu-toggle-right.png)'
    });

    $("#global-wrapper").css({
        'margin-left': '60px'
    });

    informationsBoard = "close"
}

// [Fonction] Ouverture du panneau latéral

function informationsOpen() {

    $("#informations").css({
        'width': '250px',
        'padding': '40px 20px'
    });

    $("#informations > p > span:first-child").show();
    $("#informations-logs").show();
    $("#informations > hr").show();

    $("#informations-toggle").css({
        'background-image': 'url(./img/menu-toggle-left.png)'
    });

    $("#global-wrapper").css({
        'margin-left': '270px'
    });

    informationsBoard = "open"
}

// Ajout de la fonction sur le bouton toggle

$("#informations-toggle").on("click", informationsToggle);
