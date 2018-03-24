// MISE EN ATTENTE

// [Fonction] Création d'un délai d'attente

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); // renvoyer l'état résolue pour la promesse
}

// PRÉVENTION DES APPELS RÉPÉTÉS D'UNE FONCTION

// Cette fonction limite le nombre d'appels d'une fonction (pendant le temps indiqué dans le paramètre "wait"). Elle permet d'éviter la surcharge lorsqu'une fonction serait appelée trop de fois en peu de temps sans qu'une mise à jour instantannée soit nécessaire. Importée de Github : https://gist.github.com/nmsdvid/8807205. Créée par David Nemes (nmsdvid).

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

// IDENTIFICATION DES CASES ENTOURANT UNE POSITION

// [Fonction] Identification des cases entourant une position

function findSurroundingSquares(position) { // PARAMÈTRES : position

    // Ordre des cases : haut-gauche, haut, haut-droite, gauche, droite, bas-gauche, bas, bas-droite

    // 0 1 2
    // 3 P 4
    // 5 6 7

    var surrounds = []; // tableau contenant les cases autour d'une position donnée

    // TOP-LEFT (0)

    if ((position > 9) && (position % 10 > 0)) { // SI la position est sur la deuxième ligne ou plus et sur la deuxième colonne ou plus
        surrounds.push(position - 10 - 1); // ajouter la position un cran au-dessus et un cran à gauche
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // TOP (1)

    if (position > 9) { // SI la position est sur la deuxième ligne ou plus
        surrounds.push(position - 10); // ajouter la position un cran au-dessus
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // TOP-RIGHT (2)

    if ((position > 9) && (position % 10 < 9)) { // SI la position est sur la deuxième ligne ou plus et sur la huitième colonne ou moins
        surrounds.push(position - 10 + 1); // ajouter la position un cran au-dessus et un cran à droite
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // LEFT (3)

    if (position % 10 > 0) { // SI la position est sur la deuxième colonne ou plus
        surrounds.push(position - 1); // ajouter la position un cran à gauche
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // RIGHT (4)

    if (position % 10 < 9) { // SI la position est sur la huitième colonne ou moins
        surrounds.push(position + 1); // ajouter la position un cran à droite
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // BOTTOM-LEFT (5)

    if ((position < 90) && (position % 10 > 0)) { // SI la position est sur la huitième ligne ou moins et sur la deuxième colonne ou plus
        surrounds.push(position + 10 - 1); // ajouter la position un cran en-dessous et un cran à gauche
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // BOTTOM (6)

    if (position < 90) { // SI la position est sur la huitième ligne ou moins
        surrounds.push(position + 10); // ajouter la position un cran en-dessous
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    // BOTTOM-RIGHT (7)

    if ((position < 90) && (position % 10 < 9)) { // SI la position est sur la huitième ligne ou moins et sur la huitième colonne ou moins
        surrounds.push(position + 10 + 1); // ajouter la position un cran en-dessous et un cran à droite
    }else{ // SINON
        surrounds.push(null); // ajouter la valeur "null"
    }

    return surrounds; // renvoyer le tableau des cases entourant la position

}
