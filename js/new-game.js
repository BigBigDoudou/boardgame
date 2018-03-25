// [FUNCTION] START A NEW GAME

function newGame() {

    // Reset variables and empty arrays

    round = 0;
    turn = 0;
    infoLines = 0;
    squares = [];
    players = [];
    obstacles = [];
    weapons = [];
    shields = [];
    reachs = [];
    availablePositionsForObstacles = [];
    availablePositionsForWeapons = [];
    availablePositionsForShields = [];

    // Empty / hide DOM containers and elements

    $("#board-elts").empty();
    $("#switch-container").empty();
    $("#info-logs").empty();
    $("#fight-mask").hide();

    // Create new elements

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

    // Set stats to default

    $(".player-hp").text("20");
    $(".player-hp-bar").css("width", "128px");
    $(".player-weapon-img").attr("src", "img/weapon0.png");
    $(".player-shield-img").attr("src", "img/shield0.png")
    $(".player-weapon-attack").text("1");
    $(".player-shield-defense").text("1");

    // Generate board

    generateSquares(boardSize);
    generateAvailablePositions(boardSize);
    initRemoveFromAvailablePositions();
    generatePlayers();
    generateObstacles(obstaclesQty);
    generateWeapons(weaponsQty);
    generateShields(shieldsQty);
    
    draw(squares, "square", 0);
    draw(players, "player", 0);
    draw(obstacles, "obstacle", 0);

    $("#end-mask").fadeOut();

    // Incorporate items

    draw(weapons, "weapon", 1);
    draw(shields, "shield", 1);

    // Run first turn

    newRound(turn);

}
