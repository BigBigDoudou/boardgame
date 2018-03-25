// CRÉATION DES OBJETS COMPOSANT LE JEU

// [Fonction] Création des cases

function generateSquares(size) {

    for (var i = 0; i < size; i++) { // POUR la taille du plateau
        var square = Object.create(Square); // créer un objet
        square.initSquare("SQ" + i, i); // appliquer les propriétés (number, position)
        squares.push(square); // intégrer dans le tableau dédié
    }
}

// [Fonction] Création des tableaux de cases attribuables

function generateRemainings() {

    for (var i = 0; i < squares.length; i++) { // POUR la taille du plateau
        remainingsObstacles.push(i); // définir les cases attribuables pour les obstacles
        remainingsWeapons.push(i) // définir les cases attribuables pour les armes
        remainingsShields.push(i); // définir les cases attribuables pour les boucliers
    }
}

// [Fonction] Création des joueurs

function generatePlayers() {

    for (var i = 0; i < 2; i++) { // POUR le nombre de joueurs
        var player = Object.create(Player); // créer un objet
        var playerPosition = initPlayersPosition[i]; // définir la position
        player.initPlayer("PL" + i, playerPosition); // appliquer les propriétés (number, position)
        players.push(player); // intégrer dans le tableau dédié
        squares[playerPosition].player = 1; // définir la propriété à 1
    }
}

// [Fonction] Création des obstacles

function generateObstacles(quantity) {

    for (var i = 0; i < quantity; i++) { // POUR le nombre d'obstacles
        var obstacle = Object.create(Obstacle); // créer un objet
        var obstaclePosition = elementsPosition(remainingsObstacles); // définir la position
        obstacle.initObstacle("OB" + i, obstaclePosition); // appliquer les propriétés (number, position)
        obstacles.push(obstacle); // intégrer dans le tableau dédié
        squares[obstaclePosition].obstacle = 1; // définir la propriété à 1
        removeFromRemainings(remainingsObstacles, obstaclePosition, 1); // supprimer la position attribuée des positions attribuables
    }
}

// [Fonction] Création des armes

function generateWeapons(quantity) {

    for (var i = 0; i < quantity; i++) { // POUR le nombre d'armes
        var weapon = Object.create(Weapon); // créer un objet
        var weaponName = weaponsNames[i]; // récupérer le nom de l'arme dans le tableau
        var weaponPosition = elementsPosition(remainingsWeapons); // définir la position
        var weaponLevel = Math.floor(Math.random() * 3) + 5; // définir l'attaque aléatoirement
        weapon.initWeapon("WE" + i, weaponName, weaponPosition, weaponLevel); // appliquer les propriétés (number, nom, position, attaque)
        weapons.push(weapon); // intégrer dans le tableau dédié
        squares[weaponPosition].weapon = 1; // définir la propriété à 1
        removeFromRemainings(remainingsWeapons, weaponPosition, 1); // supprimer la position attribuée des positions attribuables
    }
}

// [Fonction] Création des boucliers

function generateShields(quantity) {

    for (var i = 0; i < quantity; i++) { // POUR le nombre de boucliers
        var shield = Object.create(Shield); // créer un objet
        var shieldName = shieldsNames[i]; // récupérer le nom du bouclier dans le tableau
        var shieldPosition = elementsPosition(remainingsShields); // définir la position
        var shieldLevel = Math.floor(Math.random() * 3) + 2; // définir la défense aléatoirement
        shield.initShield("SH" + i, shieldName, shieldPosition, shieldLevel); // appliquer les propriétés (number, nom, position, défense)
        shields.push(shield); // intégrer dans le tableau dédié
        squares[shieldPosition].shield = 1; // définir la propriété à 1
        removeFromRemainings(remainingsShields, shieldPosition, 1); // supprimer la position attribuée des positions attribuables
    }
}

// POSITIONNEMENT DES ÉLÉMENTS SUR LE PLATEAU

// [Fonction] Suppression des cases attribuables

function removeFromRemainings(array, position, range) { // PARAMÈTRES : tableaux des cases attribuables pour l'objet à positionner, position de l'objet, distance de suppression

    var indexObstacles = remainingsObstacles.indexOf(position); // récupérer l'index dans le tableau de la valeur indiquée par le paramètre "position"
    var indexWeapons = remainingsWeapons.indexOf(position); // récupérer l'index dans le tableau de la valeur indiquée par le paramètre "position"
    var indexShields = remainingsShields.indexOf(position); // récupérer l'index dans le tableau de la valeur indiquée par le paramètre "position"

    if (indexObstacles !== -1) { // SI la valeur est différente de -1 (valeur non trouvée avec indexOf donc inexistante dans le tableau de cases attribuables)
        remainingsObstacles.splice(indexObstacles, 1); // supprimer la valeur dans le tableau des cases attribuables
    };

    if (indexWeapons !== -1) { // SI la valeur est différente de -1 (valeur non trouvée avec indexOf donc inexistante dans le tableau de cases attribuables)
        remainingsWeapons.splice(indexWeapons, 1); // supprimer la valeur dans le tableau des cases attribuables
    };

    if (indexShields !== -1) { // SI la valeur est différente de -1 (valeur non trouvée avec indexOf donc inexistante dans le tableau de cases attribuables)
        remainingsShields.splice(indexShields, 1); // supprimer la valeur dans le tableau des cases attribuables
    };

    var surrounds = findSurroundingSquares(position); // récupérer les positions des cases entourant la position entrée en paramètre
    if (range === 1) { // SI le paramètre "range" est 1 (= il faut supprimer les cases entourant la position)
        for (var i = 0; i < surrounds.length; i++) { // POUR chaque case entourant la position
            var index = array.indexOf(surrounds[i]); // récupérer l'index dans le tableau de la valeur de la case
            if (index !== -1) { // SI la valeur est différente de -1 (valeur non trouvée avec indexOf donc inexistante dans le tableau de cases attribuables)
                array.splice(index, 1); // supprimer la valeur dans le tableau des cases attribuables entré en paramètre
            }
        }
    }

}

// [Fonction] Suppression initiale de cases attribuables

function initRemoveFromRemainings() {

    for (var i = 0; i < initPlayersPosition.length; i++) { // POUR chaque joueur

        removeFromRemainings(remainingsObstacles, initPlayersPosition[i], 1); // supprimer la valeur de la case où est positionné le joueur et des cases alentours du tableau des cases attribuables pour les obstacles
        removeFromRemainings(remainingsWeapons, initPlayersPosition[i], 1); // supprimer la valeur de la case où est positionné le joueur et des cases alentours du tableau des cases attribuables pour les armes
        removeFromRemainings(remainingsShields, initPlayersPosition[i], 1); // supprimer la valeur de la case où est positionné le joueur et des cases alentours du tableau des cases attribuables pour les boucliers

        var initReachableSquares = findReachableSquares(i, initPlayersPosition[i]); // identifier les cases accessibles par le joueur

        for (var j = 0; j < initReachableSquares.length; j++) { // POUR chaque case accessible par le joueur
            removeFromRemainings(remainingsWeapons, initReachableSquares[j].position, 0); // supprimer la valeur de la case du tableau des cases attribuables pour les armes
            removeFromRemainings(remainingsShields, initReachableSquares[j].position, 0); // supprimer la valeur de la case du tableau des cases attribuables pour les boucliers
        }

    }
}

// [Fonction] Positionnement des objets

function elementsPosition(array) { // PARAMÈTRES : tableaux des cases attribuables pour l'objet à positionner

    var pick = array[Math.floor(Math.random() * array.length)]; // sélectionner une valeur aléatoire dans le tableau des cases attribuables de l'objet concerné

    return pick; // renvoyer la valeur choisie
}

// INTÉGRATION DES OBJETS DANS LE DOM

// [Fonction] Création des éléments du DOM

async function draw(array, object, delay) {

    var eltName = object;
    var id = object.substring(0, 2).toUpperCase(); // l'ID d'un élément correspond aux deux premières lettres, en majuscules (suivies d'un chiffre)

    for (var i = 0; i < array.length; i++) { // POUR chacun des objets
        elt = document.createElement(eltName) // créer une balise correspondante
        $(elt).attr("id", id + i); // appliquer un ID automatique
        $(elt).addClass(eltName); // ajouter la classe correspondante
        $(elt).hide(); // masquer l'élément

        if (object === "player" || object === "weapon" || object === "shield") { // SI il s'agit d'un de ces objets
            $(elt).css("background-image", "url('img/" + object + (i + 1) + ".png')"); // ajouter l'image correspondante
        }

        if (object === "square") { // SI il s'agit d'un objet Square
            $("#board-elts").append(elt); // intégrer l'élément dans l'élément portant l'ID "board"

        } else { // SINON
            $("#SQ" + array[i].position).append(elt); // intégrer l'élément dans l'élément "square" dont l'ID correspond à la position de l'élément
        }

        if (delay === 1) {
            $(elt).fadeIn();
            await sleep(25);
        } else {
            $(elt).show();
        }

    }

}
