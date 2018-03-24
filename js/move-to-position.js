// IDENTIFICATION DES CASES ACCESSIBLES

// [Fonction] Identification des cases accessibles

function findReachableSquares(player, position) { // PARAMÈTRES : joueur, position du joueur

    reachs = []; // vider le tableau des cases atteignables
    
    var surrounds = findSurroundingSquares(position); // tableau contenant les cases autour de la position du joueur
    var range = 0; // distance entre la case et la position du joueur

    // Définition des cases accessibles au-dessus du joueur

    while ( // TANT QUE...
        (surrounds[1] !== null) && // ...la case au-dessus n'est pas en dehors du plateau
        (squares[surrounds[1]].player === 0) && // ... ET la case au-dessus n'est pas occupée par un joueur
        (squares[surrounds[1]].obstacle === 0) && // ... ET la case au-dessus n'est pas occupée par un obstacle
        (range < 3) // ... ET la case testée est inférieure à 3 cases de la position du joueur
    ) { // ALORS
        var reach = Object.create(Reach); // créer un objet "reach"       
        reachFight = isReachFight(player, surrounds[1]);
        reach.initReach(player, surrounds[1], -10, (range + 1), reachFight); // appliquer les propriétés (joueur concerné, position de la case, orientation, distance à partir de la position initiale)
        reachs.push(reach); // intégrer l'objet dans le tableau des cases accessibles
        range++; // augmenter la distance de test
        surrounds = findSurroundingSquares(position - (10 * range)); // décaler les cases à tester d'une unité multipliée par la distance à partir de la position initiale
    }

    range = 0; // remettre la valeur à  0 pour le prochain test
    surrounds = findSurroundingSquares(position); // recalculer à partir de la position initiale pour le prochain test

    // Définition des cases accessibles à droite

    range = 0;
    surrounds = findSurroundingSquares(position);

    while (
        (surrounds[4] !== null) &&
        (squares[surrounds[4]].player === 0) && // ... ET la case au-dessus n'est pas occupée par un joueur
        (squares[surrounds[4]].obstacle === 0) && // ... ET la case au-dessus n'est pas occupée par un obstacle
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isReachFight(player, surrounds[4]);
        reach.initReach(player, surrounds[4], +1, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingSquares(position + (1 * range));
    }

    range = 0;
    surrounds = findSurroundingSquares(position);

    // Définition des cases accessibles en-dessous du joueur

    while (
        (surrounds[6] !== null) &&
        (squares[surrounds[6]].player === 0) && // ... ET la case au-dessus n'est pas occupée par un joueur
        (squares[surrounds[6]].obstacle === 0) && // ... ET la case au-dessus n'est pas occupée par un obstacle
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isReachFight(player, surrounds[6]);
        reach.initReach(player, surrounds[6], +10, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingSquares(position + (10 * range));
    }

    range = 0;
    surrounds = findSurroundingSquares(position);

    // Définition des cases accessibles à gauche

    range = 0;
    surrounds = findSurroundingSquares(position);

    while (
        (surrounds[3] !== null) &&
        (squares[surrounds[3]].player === 0) && // ... ET la case au-dessus n'est pas occupée par un joueur
        (squares[surrounds[3]].obstacle === 0) && // ... ET la case au-dessus n'est pas occupée par un obstacle
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isReachFight(player, surrounds[3]);
        reach.initReach(player, surrounds[3], -1, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingSquares(position - (1 * range));
    }

    return reachs; // renvoyer le tableau des cases accessibles

}

// [Fonction] - Identification des cases enclenchant un combat

function isReachFight(player, position) { // PARAMÈTRES : joueur, position du joueur

    var fightArea = 0;
    var surrounds = findSurroundingSquares(position); // identifier les cases autour de la case atteignable

    for (var i = 0; i < surrounds.length; i++) { // POUR chaque case identifiée
        if (surrounds[i] !== null) { // SI la case n'est pas en dehors du plateau ("null")
            if ((squares[surrounds[i]].player === 1) && // SI la case est occupée par un joueur
                (i === 1 || i === 3 || i === 4 || i === 6) && // ET SI la case est en haut (1), à droite (3), en bas (4) ou à gauche (6)
                (squares[surrounds[i]].position !== players[player].position)) { // // ET SI la case n'est pas celle où se trouve le joueur
                fightArea = 1; // indiquer la valeur 1 à l'objet
            }
        }
    }

    return fightArea;
}

// [Fonction] - Création des éléments dans le DOM

function drawReachableSquares(player, position) { // PARAMÈTRES : joueur, position du joueur

    findReachableSquares(player, position);

    $(".reach").remove(); // supprimer les anciennes cases "reach"
    $(".reach-fight").remove(); // supprimer les anciennes cases "reach-fight"

    for (var i = 0; i < reachs.length; i++) { // POUR chaque case accessible

        var reach = document.createElement("button"); // créer un élément "button"
        $(reach).attr("id", "RE" + i); // attribuer l'id automatique

        if (reachs[i].fight === 1) {
            $(reach).addClass("reach-fight");
            console.log("%cLe joueur " + (player + 1) + " peut attaquer sur la case " + reachs[i].position, "color: orange"); // Afficher les informations dans la console
        } else {
            $(reach).addClass("reach");
        }

        $("#SQ" + reachs[i].position).append(reach); // intégrer l'élément dans le DOM
    }
    
    moving = 1; // activer l'effet au clic

}

// [Fonction] - Création des informations dans la console

function consoleReachableSquares(player, reachables) { // PARAMÈTRES : joueur, cases accessibles par le joueur

    reachsList = ""; // texte informatif à afficher dans la console

    for (var i = 0; i < reachs.length; i++) { // POUR chaque objet
        reachsList += "(" + reachs[i].position + ")"; // ajouter la case accessible au texte informatif
    }

    console.log("%cCases accessibles par le joueur " + (player + 1) + " : " + reachsList, "color: #999"); // afficher dans la console le texte informatif
}

// DÉPLACEMENTS DES JOUEURS

// [Fonction] - Déplacement du joueur

async function moveToPosition() { // fonction asynchone permettant d'utiliser à l'intérieur une fonction await

    if (moving === 1) { // SI le joueur peut cliquer sur une case accessible

        moving = 0; // désactiver le clic (pour éviter que le joueur ne reclique pendant le déplacement)

        console.log("%c| TOUR DU JOUEUR " + (turn + 1) + " |", "color:#fff; font-weight:bold; background-color: #333") // indiquer le joueur dans la console

        squares[players[turn].position].player = 0; // mettre à jour la case de laquelle le joueur part

        var id = this.id.substr(2); // récupérer le numéro de la case à partir de l'id de l'élément "reach" déclenchant l'événement

        var moves = 1; // déclarer une variable pour suivre la distance

        while (moves <= reachs[id].range) { // TANT QUE le déplacement est inférieur à la distance indiquée par l'objet "reach"
            $("#SQ" + (players[turn].position + (reachs[id].side * moves))).append($("#PL" + turn)); // déplacer l'élément du joueur dans l'élément case correspondant
            if ((squares[players[turn].position + (reachs[id].side * moves)].weapon) === 1) { // SI le joueur se trouve sur une case contenant une arme
                switchItem(turn, squares[players[turn].position + (reachs[id].side * moves)].position, "weapon"); // déclencher la fonction d'échange d'objet
                await sleep(switchFade * 1.5); // attendre
            } else if ((squares[players[turn].position + (reachs[id].side * moves)].shield) === 1) { // SI le joueur se trouve sur une case contenant un bouclier
                switchItem(turn, squares[players[turn].position + (reachs[id].side * moves)].position, "shield"); // déclencher la fonction d'échange d'objet
                await sleep(switchFade * 1.5); // attendre
            }

            await sleep(moveFade); // attendre
            moves++; // incrémenter la distance
        }

        players[turn].position = players[turn].position + reachs[id].side * (moves - 1); // mettre à jour la position de l'objet "joueur" correspondant
        squares[players[turn].position].player = 1; // définir la propriété de la nouvelle position du joueur

        console.log("%cLe joueur " + (turn + 1) + " s'est déplacé sur la case " + players[turn].position, "color:#666"); // indiquer le déplacement dans la console
        informations("Le joueur " + (turn + 1) + " s'est déplacé sur la case " + players[turn].position + ".", "#b7b7b7"); // afficher les informations dans le panneau

        var fightArea = 0;

        for (i = 0; i < reachs.length; i++) {
            if ((reachs[i].position === players[turn].position) && (reachs[i].fight === 1)) {
                fightArea = 1;
            }
        }

        reachs = []; // vider le tableau des cases atteignables
        $(".reach").remove(); // supprimer les anciennes cases "reach"
        $(".reach-fight").remove(); // supprimer les anciennes cases "reach-fight"

        if (fightArea === 1) {
            startFight(); // lancer un combat

        } else { // SI la case d'arrivée du joueur n'est pas une zone de combat
            turn = 1 - turn; // changer de joueur (0 donne 1 et 1 donne 0)
            var reachableByPlayer = drawReachableSquares(turn, players[turn].position); // définir les cases atteignables par le nouveau joueur
            consoleReachableSquares(turn, reachableByPlayer); // afficher l'information dans la console
        }
    }

}

// Application de la fonction sur les cases accessibles

$(document).on("click", ".reach", moveToPosition); // ajouter la fonction de déplacement au clic sur les éléments comportant la classe "reach", donc atteignables
$(document).on("click", ".reach-fight", moveToPosition); // ajouter la fonction de déplacement au clic sur les éléments comportant la classe "reach-fight", donc atteignables
