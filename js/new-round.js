// [Fonction] Démarrage d'un nouveau round

function newRound(turn) { // PARAMÈTRES : tour (joueur entrain de jouer)

    round++;

    informations("*** ROUND " + round + " ***", "#ffd966"); // afficher les informations dans le panneau

    // Remettre à l'état initial les éléments

    for (var i = 0; i < players.length; i++) { // POUR chaque objet player
        squares[players[i].position].player = 0; // indiquer que l'ancienne case n'est plus occupée par un joueur
        players[i].position = initPlayersPosition[i]; // remettre le joueur à sa position initiale
        squares[players[i].position].player = 1; // indiquer que la nouvelle case est occupée par un joueur
        $("#SQ" + (players[i].position)).append($("#PL" + i)); // déplacer l'élément du joueur dans l'élément case correspondant
    }

    for (var l = 0; l < reachs; l++) { // POUR chaque objet reach
        reachs.fight = 0; // mettre la propriété "fight" à 0
    }

    console.log("%c| TOUR DU JOUEUR " + (turn + 1) + " |", "color:#fff; font-weight:bold; background-color: #333"); // afficher l'information dans la console
    var initReachables = findReachableSquares(turn, players[turn].position); // définir les cases accessibles
    consoleReachableSquares(turn, initReachables); // afficher l'information dans la console
    
    if (round > 1) { // SI ce n'est pas le premier round
        repositionItems(); // repositionner aléatoire les équipements
    }

    $("#round").text("Round " + round); // intégrer le numéro du tour
    $("#round").fadeIn(roundFade).delay(roundFade).fadeOut(roundFade); // afficher le tour pendant 800ms puis masquer

    setTimeout(function () {
        drawReachableSquares(turn, players[turn].position); // afficher les cases accessibles
    }, roundFade * 3);

}

// [Fonction] Repositionnement aléatoire des équipements

async function repositionItems() {

    for (var h = 0; h < squares.length; h++) { // POUR chaque case
        squares[h].weapon = 0; // enlever la présence d'arme
        squares[h].shield = 0; // enlever la présence de bouclier
    }

    for (var i = 0; i < weapons.length; i++) { // POUR chaque objet "weapon"

        if (weapons[i].position > 0) { // SI l'arme est sur le plateau
            $("weapon").hide(); // cacher l'élément dans le DOM
            remainingsWeapons.push(weapons[i].position); // ajouter sa position aux cases attribuables
        }

    }

    for (j = 0; j < shields.length; j++) { // POUR chaque objet "shield"

        if (shields[j].position > 0) { // SI le bouclier est sur le plateau
            $("shield").hide(); // cacher l'élément dans le DOM
            remainingsShields.push(shields[j].position); // ajouter sa position aux cases attribuables
        }

    }

    for (var k = 0; k < weapons.length; k++) { // POUR chaque objet "weapon"

        if (weapons[k].position > 0) { // SI l'arme est sur le plateau
            weapons[k].position = elementsPosition(remainingsWeapons); // définir une nouvelle position pour l'arme
            squares[weapons[k].position].weapon = 1; // ajouter la présence d'une arme
            removeFromRemainings(remainingsWeapons, weapons[k].position, 1); // supprimer la position attribuée des positions attribuables
            $("#SQ" + weapons[k].position).append($("#" + weapons[k].number)); // modifier la position de l'élément dans le DOM
            await sleep(25);
            $("#" + weapons[k].number).fadeIn(); // afficher l'élément dans le DOM
        }

    }

    for (var l = 0; l < shields.length; l++) { // POUR chaque objet "shield"

        if (shields[l].position > 0) { // SI le bouclier est toujours disponible
            shields[l].position = elementsPosition(remainingsShields); // définir une nouvelle position pour le bouclier
            squares[shields[l].position].shield = 1; // ajouter la présence d'un bouclier
            removeFromRemainings(remainingsShields, shields[l].position, 1); // supprimer la position attribuée des positions attribuables
            $("#SQ" + shields[l].position).append($("#" + shields[l].number)); // modifier la position de l'élément dans le DOM
            await sleep(25);
            $("#" + shields[l].number).fadeIn(); // afficher l'élément dans le DOM
        }

    }
}
