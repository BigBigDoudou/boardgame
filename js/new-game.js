// [Fonction] Lancement d'une nouvelle partie

function newGame() {

    console.log("*** NEW GAME ***");

    // Mettre les variable à 0 et vider les tableaux

    round = 0;
    turn = 0;
    squares = []; // tableau des cases
    players = []; // tableau des joueurs
    obstacles = []; // tableau des obstacles
    weapons = []; // tableau des armes
    shields = []; // tableau des boucliers
    reachs = []; // tableau des positions atteignables par les joueurs
    remainingsObstacles = []; // tableau des positions attribuables
    remainingsWeapons = []; // tableau des positions attribuables
    remainingsShields = []; // tableau des positions attribuables

    // Vider les conteneurs et supprimer les éléments

    $("#board-elts").empty();
    $("#switch-container").empty();
    $("#informations-logs").empty();
    infoLines = 0;

    // Masquer les éléments

    $("#fight-mask").hide();

    // Créer les icônes

    var switchArrowElt = document.createElement("switch");
    var switchElt = document.createElement("switch");
    var switchBeforeElt = document.createElement("switch");
    var switchAfterElt = document.createElement("switch");

    $(switchArrowElt).attr("id", "switch-arrow");
    $(switchElt).attr("id", "switch");
    $(switchBeforeElt).attr("id", "switch-before");
    $(switchAfterElt).attr("id", "switch-after");

    $("#switch-container").append(switchArrowElt);
    $("#switch-container").append(switchElt);
    $("#switch-container").append(switchBeforeElt);
    $("#switch-container").append(switchAfterElt);

    $(switchArrowElt).hide();
    $(switchElt).hide();
    $(switchBeforeElt).hide();
    $(switchAfterElt).hide();

    // Mettre les statistiques initiales

    $(".player-hp").text("20"); // points de vie
    $(".player-hp-bar").css("width", "128px"); // barres de vie
    $(".player-weapon-img").attr("src", "img/weapon0.png"); // images d'armes
    $(".player-shield-img").attr("src", "img/shield0.png"); // images de boucliers
    $(".player-weapon-attack").text("1");
    $(".player-shield-defense").text("1");

    // Préparer le plateau

    generateSquares(boardSize);
    generateRemainings();
    initRemoveFromRemainings();
    generatePlayers();
    generateObstacles(obstaclesQty);
    generateWeapons(weaponsQty);
    generateShields(shieldsQty);

    // Dessiner le plateau

    draw(squares, "square", 0);
    draw(players, "player", 0);
    draw(obstacles, "obstacle", 0);

    // Montrer le plateau

    $("#end-mask").fadeOut();

    // Intégrer les équipements

    draw(weapons, "weapon", 1);
    draw(shields, "shield", 1);

    // Lancer le premier tour

    newRound(turn);

}
