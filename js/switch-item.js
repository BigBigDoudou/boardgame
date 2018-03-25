// CHANGEMENT D'ÉQUIPEMENT

// [Fonction] Changement de l'équipement du joueur

function switchItem(player, position, type) { // PARAMÈTRES : joueur, position du joueur, type d'équipement

    var itemBefore; // équipement porté avant le changement
    var itemAfter; // équipement porté avant le changement
    var itemArray; // tableau correspondant au type d'équipement trouvé
    var itemIdStart; // nomenclature d'Id de l'équipement
    var itemBeforeLvl; // niveau de l'équipement d'avant (attaque ou défense)
    var itemAfterLvl; // niveau de l'équipement d'après (attaque ou défense)

    if (type === "weapon") { // SI il s'agit d'une arme
        itemArray = weapons;
        itemBefore = players[player].weapon;
        itemIdStart = "#WE";
    } else if (type === "shield") { // SI il s'agit d'un bouclier
        itemArray = shields;
        itemBefore = players[player].shield;
        itemIdStart = "#SH";
    }

    for (var i = 0; i < itemArray.length; i++) { // POUR chaque objet du tableau d'équipement

        if (itemArray[i].position === position) { // SI une correspondance avec l'équipement est trouvée (position identique)

            itemAfter = i; // équipement trouvé

            // Animation d'échange d'équipement

            $("#switch-arrow").css("border-top-color", colors[player]);
            $("#switch").css("background-color", colors[player]);
            $("#switch-before").css("background-color", colors[player]);
            $("#switch-after").css("background-color", colors[player]);
            $("#SQ" + position).append($("#switch-arrow"));
            $("#SQ" + position).append($("#switch"));
            $("#SQ" + position).append($("#switch-before"));
            $("#SQ" + position).append($("#switch-after"));

            if (itemBefore >= 0) { // SI le joueur possédait un équipement auparavant
                $("#switch").css("background-image", "url('img/switch-arrow.png')");
                $("#switch-before").css("background-image", "url('img/" + type + (itemBefore + 1) + ".png')");
                $("#switch-after").css("background-image", "url('img/" + type + (itemAfter + 1) + ".png')");
                $("#switch-before").fadeIn(switchFade).delay(switchFade * 0.8).fadeOut(switchFade); // afficher puis masquer
                $("#switch-after").fadeIn(switchFade).delay(switchFade * 0.8).fadeOut(switchFade); // afficher puis masquer
            } else { // SI le joueur ne possédait pas d'équipement auparavant
                $("#switch").css("background-image", "url('img/" + type + (itemAfter + 1) + ".png')");
            }

            $("#switch-arrow").fadeIn(switchFade).delay(switchFade * 0.8).fadeOut(switchFade); // afficher puis masquer
            $("#switch").fadeIn(switchFade).delay(switchFade * 0.8).fadeOut(switchFade); // afficher puis masquer

            // Ajout du nouvel équipement dans les informations joueur

            if (type === "weapon") {
                itemAfterLvl = itemArray[i].attack;
                players[player].weapon = itemAfter; // changer l'équipement du joueur
                players[player].attack = itemArray[itemAfter].attack; // changer les statistiques du joueur
            } else if (type === "shield") {
                itemAfterLvl = itemArray[i].defense;
                players[player].shield = itemAfter; // changer l'équipement du joueur
                players[player].defense = itemArray[itemAfter].defense; // changer les statistiques du joueur
            }

            $("#player" + (turn + 1) + " .player-" + type + "-img").attr("src", "img/" + type + (itemAfter + 1) + ".png"); // mettre à jour de l'icône d'équipement dans les informations du joueur

            if (type === "weapon") {
                $("#player" + (turn + 1) + " .player-weapon-attack").text(players[turn].attack); // mise à jour des statistiques dans les informations du joueur
            } else if (type === "shield") {
                $("#player" + (turn + 1) + " .player-shield-defense").text(players[turn].defense); // mise à jour des statistiques dans les informations du joueur
            }

            // Remplacement de l'équipement et informations

            if (itemBefore >= 0) { // SI le joueur possédait un équipement auparavant

                if (type === "weapon") {
                    itemBeforeLvl = itemArray[i].attack;
                } else if (type === "shield") {
                    itemBeforeLvl = itemArray[i].defense;
                }

                itemArray[itemBefore].position = position; // positionner l'ancien équipement sur le plateau à la position actuelle
                $("#SQ" + position).append($(itemIdStart + itemBefore)); // transférer l'ancien équipement dans le DOM à sa nouvelle position
                $(itemIdStart + itemBefore).show(); // afficher l'ancien équipement dans le DOM (auparavant caché lorsqu'il était trouvé)

                console.log("%c|" + position + "| Le joueur " + (player + 1) + " a posé '" + itemArray[itemBefore].name + "' (" + itemBeforeLvl + ") et ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ")", "color:rgb(0, 0, 255)"); // afficher l'information dans la console
                informations("Le joueur " + (player + 1) + " a posé '" + itemArray[itemBefore].name + "' (" + itemBeforeLvl + ") et ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ").", "#76a5af"); // afficher les informations dans le panneau

            } else { // SI le héros ne possédait pas d'arme auparavant

                squares[position].weapon = 0; // définir le nombre d'armes sur la case à 0
                squares[position].shield = 0; // définir le nombre de boucliers sur la case à 0
                console.log("%c|" + position + "| Le joueur " + (player + 1) + " a ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ")", "color:rgb(0, 0, 255)"); // afficher l'information dans la console
                informations("Le joueur " + (player + 1) + " a ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ").", "#76a5af"); // afficher les informations dans le panneau
            }

            // Masquage de l'équipement trouvé

            itemArray[itemAfter].position = -1; // extraire du plateau l'équipement trouvé
            $(itemIdStart + itemAfter).hide(); // cacher l'équipement trouvé

            break; // arrêter la boucle (il ne peut y avoir qu'un équipement sur une position donnée)

        }

    }
}

// [Fonction] Affichage du niveau d'un équipement

function showItemsLevel() {

    var id = Number(this.id.substr(2)); // récupérer l'id de l'équipement à partir de l'id de l'élément DOM lançant la fonction
    var type = $(this).attr("class"); // récupérer la classe de l'élément DOM lançant la fonction

    $(this).css("background-image", "none"); // masquer l'image d'arrière-plan

    if (type === "weapon") { // SI il s'agit d'une arme

        if ($(this).parent().parent().hasClass("example") === true) { // SI l'arme est dans la page des règles
            $(this).text("4"); // afficher 4
        } else { // SINON
            $(this).text(weapons[id].attack); // afficher l'attaque
        }
    } else { // SI il s'agit d'un bouclier

        if ($(this).parent().parent().hasClass("example") === true) { // SI le bouclier est dans la page des règles
            $(this).text("2"); // afficher 2
        } else { // SINON
            $(this).text(shields[id].defense); // afficher la défense
        }

    }

}

// [Fonction] Masquage du niveau d'un équipement

function hideItemsLevel() {

    var id = Number(this.id.substr(2)); // récupérer l'id de l'équipement à partir de l'id de l'élément DOM lançant la fonction
    var type = $(this).attr("class"); // récupérer la classe de l'élément DOM lançant la fonction

    $(this).text(""); // supprimer le contenu textuel

    if ($(this).parent().parent().hasClass("example") === true) { // SI l'équipement est dans la page des règles
        $(this).css("background-image", "url('img/weapon1.png')") // afficher l'image correspondante
    } else {
        $(this).css("background-image", "url('img/" + type + (id + 1) + ".png')") // afficher l'image correspondante
    }

}

// Application des fonctions sur les équipements

$(document).on("mouseover", ".weapon", showItemsLevel);
$(document).on("mouseover", ".shield", showItemsLevel);

$(document).on("mouseout", ".weapon", hideItemsLevel);
$(document).on("mouseout", ".shield", hideItemsLevel);
