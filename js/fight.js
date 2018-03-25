// FIGHTS

// *** [FUNCTION] SET FIGHT CONTROLS

function startFight() {

    $("#fight-mask").fadeIn(200); // apply mask on board
    info("Le joueur " + (turn + 1) + " attaque le joueur " + (1 - turn + 1) + ".", "#e06666"); // show info in panel

    // Create elements

    var assailantWeaponArrow = document.createElement("arrow"); // create a arrow element for assailant weapon
    var assailantWeapon = document.createElement("attack"); // create a element for assailant weapon

    var defenderWeaponArrow = document.createElement("arrow"); // create a arrow element for defender weapon
    var defenderShieldArrow = document.createElement("arrow"); // create a element for defender weapon
    var defenderWeapon = document.createElement("attack"); // create a arrow element for defender shield
    var defenderShield = document.createElement("defense"); // create a element for defender shield

    // Add classes

    $(assailantWeaponArrow).addClass("fight-arrow"); // add class to arrow
    $(assailantWeapon).addClass("assailant-item"); // "

    $(defenderWeaponArrow).addClass("fight-arrow"); // "
    $(defenderShieldArrow).addClass("fight-arrow"); // "
    $(defenderWeapon).addClass("defender-item"); // "
    $(defenderShield).addClass("defender-item"); // "

    // Define properties

    $(assailantWeapon).css("background-color", colors[turn + 2]); // set light color for assailant weapon (disable)
    $(assailantWeapon).css("background-image", "url('img/weapon" + (players[turn].weapon + 1) + ".png')"); // set background-image

    $(defenderWeapon).css("background-color", colors[1 - turn]); // "
    $(defenderWeapon).css("background-image", "url('img/weapon" + (players[1 - turn].weapon + 1) + ".png')"); // "
    $(defenderShield).css("background-color", colors[1 - turn]); // "
    $(defenderShield).css("background-image", "url('img/shield" + (players[1 - turn].shield + 1) + ".png')"); // "

    // Define icons positions

    var assailantSide; // add a variable for assailant side (relatively to defender)
    var defenderSide; // add a variable for defender side (relatively to assailant)

    switch (players[turn].position - players[1 - turn].position) { // check difference between positions of assailant and defender

        case -10: // CASE assailant comes from top
            assailantSide = "top";
            defenderSide = "bottom";
            $(assailantWeaponArrow).css({
                'top': '-25px',
                'left': '10px'
            });
            $(assailantWeapon).css({
                'top': '-65px',
                'left': '10px'
            });
            $(defenderWeaponArrow).css({
                'top': '45px',
                'left': '-15px'
            });
            $(defenderWeapon).css({
                'top': '85px',
                'left': '-15px'
            });
            $(defenderShieldArrow).css({
                'top': '45px',
                'left': '35px'
            });
            $(defenderShield).css({
                'top': '85px',
                'left': '35px'
            });
            break;

        case 1: // CASE assailant comes from right
            assailantSide = "right";
            defenderSide = "left";
            $(assailantWeaponArrow).css({
                'top': '10px',
                'left': '45px'
            });
            $(assailantWeapon).css({
                'top': '10px',
                'left': '85px'
            });
            $(defenderWeaponArrow).css({
                'top': '-15px',
                'left': '-25px'
            });
            $(defenderWeapon).css({
                'top': '-15px',
                'left': '-65px'
            });
            $(defenderShieldArrow).css({
                'top': '35px',
                'left': '-25px'
            });
            $(defenderShield).css({
                'top': '35px',
                'left': '-65px'
            });
            break;

        case 10: // CASE assailant comes from bottom
            assailantSide = "bottom";
            defenderSide = "top";
            $(assailantWeaponArrow).css({
                'top': '45px',
                'left': '10px'
            });
            $(assailantWeapon).css({
                'top': '85px',
                'left': '10px'
            });
            $(defenderWeaponArrow).css({
                'top': '-25px',
                'left': '-15px'
            });
            $(defenderWeapon).css({
                'top': '-65px',
                'left': '-15px'
            });
            $(defenderShieldArrow).css({
                'top': '-25px',
                'left': '35px'
            });
            $(defenderShield).css({
                'top': '-65px',
                'left': '35px'
            });
            break;

        case -1: // CASE assailant comes from left
            assailantSide = "left";
            defenderSide = "right";
            $(assailantWeaponArrow).css({
                'top': '10px',
                'left': '-25px'
            });
            $(assailantWeapon).css({
                'top': '10px',
                'left': '-65px'
            });
            $(defenderWeaponArrow).css({
                'top': '-15px',
                'left': '45px'
            });
            $(defenderWeapon).css({
                'top': '-15px',
                'left': '85px'
            });
            $(defenderShieldArrow).css({
                'top': '35px',
                'left': '45px'
            });
            $(defenderShield).css({
                'top': '35px',
                'left': '85px'
            });
            break;
    }

    // Define CSS properties

    $(assailantWeaponArrow).css("border-" + assailantSide + "-color", colors[turn + 2]); // add a border to arrow (shows a triangle)
    $(defenderWeaponArrow).css("border-" + defenderSide + "-color", colors[1 - turn]); // "
    $(defenderShieldArrow).css("border-" + defenderSide + "-color", colors[1 - turn]); // "

    $(assailantWeaponArrow).hide(); // hide element
    $(assailantWeapon).hide(); // "
    $(defenderWeaponArrow).hide(); // "
    $(defenderShieldArrow).hide(); // "
    $(defenderWeapon).hide(); // "
    $(defenderShield).hide(); // "

    // Add onclick functions

    $(defenderWeapon).on("click", function () { // add onclick function on defender weapon
        chooseAction("attack");
    });

    $(defenderShield).on("click", function () { // add onclick function on defender shield
        chooseAction("defense");
    });

    // Incorporate elements in DOM

    $("#SQ" + players[turn].position).append(assailantWeaponArrow);
    $("#SQ" + players[turn].position).append(assailantWeapon);
    $("#SQ" + players[1 - turn].position).append(defenderWeaponArrow);
    $("#SQ" + players[1 - turn].position).append(defenderShieldArrow);
    $("#SQ" + players[1 - turn].position).append(defenderWeapon);
    $("#SQ" + players[1 - turn].position).append(defenderShield);

    $(assailantWeaponArrow).fadeIn(600);
    $(assailantWeapon).fadeIn(600);
    $(defenderWeaponArrow).fadeIn(600);
    $(defenderShieldArrow).fadeIn(600);
    $(defenderWeapon).fadeIn(600);
    $(defenderShield).fadeIn(600);

}

// [FUNCTION] DEFINE FIGHT IMPACTS

function chooseAction(action) {

    // Remove controls

    $("arrow").remove();
    $("attack").remove();
    $("defense").remove();
    
    // Create variables

    var assailantAttack = players[turn].attack; // attack from assailant
    var defenderAttack = players[1 - turn].attack; // attack from defender
    var defenderDefense = players[1 - turn].defense; // defense from defender

    var assailantDamages = 0; // damages from assailant
    var defenderDamages = 0; // damages from defender

    // Define impacts

    if (action === "attack") { // IF defender counterattacks
        info("Le joueur " + (1 - turn + 1) + " contre-attaque.", "#f6b26b"); // show info in panel
        assailantDamages = assailantAttack; // apply assailant attack
        defenderDamages = defenderAttack; // apply defender attack

    } else if (action === "defense") { // IF defender blocks
        info("Le joueur " + (1 - turn + 1) + " se défend.", "#f6b26b"); // show info in panel
        assailantDamages = assailantAttack - defenderDefense; // apply assailant attack reduced by defender defense
        if (assailantDamages < 0) { // IF damages are below zero (shield defense > weapon attack)
            assailantDamages = 0; // set damages to zero
        }

        // Update stuff

        if (players[turn].weapon !== -1) { // IF assailant possesses weapon
            weapons[players[turn].weapon].attack -= defenderDefense; // decrease weapon attack by shield defense
        }

        if (players[1 - turn].shield !== -1) { // IF defender possesses shield
            shields[players[1 - turn].shield].defense -= players[turn].attack; // decrease shield defense by weapon attack
        }

        if (players[turn].weapon !== -1) { // IF assailant possesses weapon
            if (weapons[players[turn].weapon].attack <= 0) { // IF weapon attack is below zero
                info("L'arme du joueur " + (turn + 1) + " s'est brisée.", "#76a5af"); // show info in panel
                weapons[players[turn].weapon].position = -2; // remove weapon from the game
                players[turn].weapon = -1; // remove weapon from assailant
                players[turn].attack = 1; // set assailant attack to 1 (default)
                $("#player" + (turn + 1) + " .player-weapon-img").attr("src", "img/weapon0.png"); // update weapon icon (default)
            } else { // ELSE
                players[turn].attack = weapons[players[turn].weapon].attack; // set assailant attack to weapon attack
            }
        }
        
        $("#player" + (turn + 1) + " .player-weapon-attack").text(players[turn].attack); // update assailant attack stats

        if (players[1 - turn].shield !== -1) { // IF defender possesses shield
            if (shields[players[1 - turn].shield].defense <= 0) { // IF shield defense is below zero
                info("Le bouclier du joueur " + (1 - turn + 1) + " a éclaté en morceaux.", "#76a5af"); // show info in panel
                shields[players[1 - turn].shield].position = -2; // remove shield from the game
                players[1 - turn].shield = -1; // remove shield from defender
                players[1 - turn].defense = 1; // set defender defense to 1 (default)
                $("#player" + (1 - turn + 1) + " .player-shield-img").attr("src", "img/shield0.png"); // update shield icon (default)
            } else { // SINON
                players[1 - turn].defense = shields[players[1 - turn].shield].defense; // set defender defense to shield defense
            }
        }
        
        $("#player" + (1 - turn + 1) + " .player-shield-defense").text(players[1 - turn].defense); // update defender defense stats

    }

    // Create elements for hp lost

    var assailantHpLost = document.createElement("heart"); // create element for hp lost by assailant
    var defenderHpLost = document.createElement("heart"); // create element for hp lost by defender

    // Define icons positions

    switch (players[turn].position - players[1 - turn].position) {

        case -10: // CASE assailant comes from top

            $(assailantHpLost).css({
                'top': '-45px',
                'left': '10px'
            });

            $(defenderHpLost).css({
                'top': '65px',
                'left': '10px'
            });

            break;

        case 1: // CASE assailant comes from right

            $(assailantHpLost).css({
                'top': '10px',
                'left': '65px'
            });

            $(defenderHpLost).css({
                'top': '10px',
                'left': '-45px'
            });

            break;

        case 10: // CASE assailant comes from bottom

            $(assailantHpLost).css({
                'top': '65px',
                'left': '10px'
            });

            $(defenderHpLost).css({
                'top': '-45px',
                'left': '10px'
            });

            break;

        case -1: // CASE assailant comes from left

            $(assailantHpLost).css({
                'top': '10px',
                'left': '-45px'
            });

            $(defenderHpLost).css({
                'top': '10px',
                'left': '65px'
            });

            break;
    }

    // Define CSS properties

    $(assailantHpLost).addClass("hp-lost-player" + (turn + 1)); // add class
    $(defenderHpLost).addClass("hp-lost-player" + (1 - turn + 1)); // "
    $(assailantHpLost).text("- " + defenderDamages); // set text to hp lost
    $(defenderHpLost).text("- " + assailantDamages); // "
    $(assailantHpLost).hide(); // hide element
    $(defenderHpLost).hide(); // "
    $("#SQ" + players[1 - turn].position).append(defenderHpLost); // incorporate element to related square
    $("#SQ" + players[turn].position).append(assailantHpLost); // "

    // Show elements in DOM

    if ((players[1 - turn].hp - assailantDamages) <= 0) { // IF assailant kills defender (first strike of the fight)
        $(defenderHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // show temporarily for defender
    } else { //SINON
        $(defenderHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // show temporarily for defender
        $(assailantHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // show temporarily for assailant
    }

    // Update hp and player stats

    setTimeout(function () { // use setTimeout to delay the function

        players[1 - turn].hp -= assailantDamages; // reduce defender hp by assailant damages
        if (players[1 - turn].hp <= 0) { // IF defender life is below zero
            players[1 - turn].hp = 0; // set hp to zero
            info("Le joueur " + (1 - turn + 1) + " est mort ! Le joueur " + (turn + 1) + " a gagné !", "#e06666"); // show info in panel
            endGame(turn); // end game
        } else { // ELSE
            info("Le joueur " + (1 - turn + 1) + " a perdu " + assailantDamages + " points de vie.", "#e06666"); // show info in panel
            players[turn].hp -= defenderDamages; // reduce assailant hp by defender damages
            if (players[turn].hp <= 0) { // IF assailant life is below zero
                players[turn].hp = 0; // set hp to zero
                info("Le joueur " + (turn + 1) + " est mort ! Le joueur " + (1 - turn + 1) + " a gagné !", "#e06666"); // show info in panel
                endGame(1 - turn); // lancer la fonction de fin de partie
            } else { // ELSE
                info("Le joueur " + (turn + 1) + " a perdu " + defenderDamages + " points de vie.", "#e06666"); // show info in panel
                $("#fight-mask").hide(); // hide mask
                turn = 1 - turn; // change player turn
                newRound(turn); // run a new turn
            }
        }

        $("#player" + (1 - turn + 1) + " .player-hp").text(players[1 - turn].hp); // update hp stats in player pannel
        $("#player" + (turn + 1) + " .player-hp").text(players[turn].hp); // "
        $("#player" + (1 - turn + 1) + " .player-hp-bar").css("width", (players[1 - turn].hp / 20 * 100) + "px"); // update hp bar in player pannel
        $("#player" + (turn + 1) + " .player-hp-bar").css("width", (players[turn].hp / 20 * 100) + "px"); // "

    }, hpFade * 3);

}

// [FUNCTION] SHOW END SCREEN

function endGame(player) {

    // Show mask

    $("#end-mask").show();

    // Update info

    $("#winner-img").css("background-color", colors[player]);
    $("#winner-img").css("background-image", "url('img/player" + (player + 1) + ".png')")
    $("#winner-player").text("Le joueur " + (player + 1) + " a vaincu !")
    $("#winner-player").text("Le joueur " + (player + 1) + " a vaincu !")

}
