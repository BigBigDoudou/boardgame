// IDENTIFICATION OF REACHABLE POSITIONS

// [FUNCTION] FIND REACHABLE POSITIONS

function findReachablePositions(player, position) { // PARAMETERS : player, position

    reachs = []; // vider le tableau des cases atteignables

    var surrounds = findSurroundingPositions(position); // create a variable to define surrounding positions
    var range = 0; // set distance tested to zero

    // Define reachable positions : top

    while ( // WHILE...
        (surrounds[1] !== null) && // ...the position above exist (not outside of the board)
        (squares[surrounds[1]].player === 0) && // ... AND the position above is not occupied by a player
        (squares[surrounds[1]].obstacle === 0) && // ... AND the position above is not occupied by an obstacle
        (range < 3) // ... AND the tested position distance from player position is below 3
    ) { // THEN
        var reach = Object.create(Reach); // create an object reach
        reachFight = isLeadingToFight(player, surrounds[1]); // define is the reachable position is a fighting position
        reach.initReach(player, surrounds[1], -10, (range + 1), reachFight); // set properties
        reachs.push(reach); // push object in array
        range++; // increase range of position tested
        surrounds = findSurroundingPositions(position - (10 * range)); // move forward the test
    }

    // Define reachable positions : right

    range = 0; // reset range for next test
    surrounds = findSurroundingPositions(position); // reset surrounds for next test

    while (
        (surrounds[4] !== null) &&
        (squares[surrounds[4]].player === 0) &&
        (squares[surrounds[4]].obstacle === 0) &&
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isLeadingToFight(player, surrounds[4]);
        reach.initReach(player, surrounds[4], +1, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingPositions(position + (1 * range));
    }

    // Define reachable positions : bottom

    range = 0;
    surrounds = findSurroundingPositions(position);

    while (
        (surrounds[6] !== null) &&
        (squares[surrounds[6]].player === 0) &&
        (squares[surrounds[6]].obstacle === 0) &&
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isLeadingToFight(player, surrounds[6]);
        reach.initReach(player, surrounds[6], +10, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingPositions(position + (10 * range));
    }

    // Define reachable positions : left

    range = 0;
    surrounds = findSurroundingPositions(position);

    while (
        (surrounds[3] !== null) &&
        (squares[surrounds[3]].player === 0) &&
        (squares[surrounds[3]].obstacle === 0) &&
        (range < 3)
    ) {
        var reach = Object.create(Reach);
        reachFight = isLeadingToFight(player, surrounds[3]);
        reach.initReach(player, surrounds[3], -1, (range + 1), reachFight);
        reachs.push(reach);
        range++;
        surrounds = findSurroundingPositions(position - (1 * range));
    }

    return reachs; // return array

}

// [FUNCTION] DEFINE IF A POSITION LEADS TO A FIGHT

function isLeadingToFight(player, position) { // PARAMETERS : player, position

    var leadToFight = 0; // create a variable set to 0
    var surrounds = findSurroundingPositions(position); // find surrouding positions

    for (var i = 0; i < surrounds.length; i++) { // FOR each surrouding position
        if (surrounds[i] !== null) { // IF the position existe
            if ((squares[surrounds[i]].player === 1) && // IF a player is into it
                (i === 1 || i === 3 || i === 4 || i === 6) && // AND if the position is at top, bottom, left or right (not diagonal)
                (squares[surrounds[i]].position !== players[player].position)) { // // AND is not the position where the player himself is
                leadToFight = 1; // set variable value to 1
            }
        }
    }

    return leadToFight; // return variable value (0 = not leading ; 1 = leading)
}

// [FUNCTION] INCORPORATE ELEMENTS IN DOM

function drawReachablePositions(player, position) { // PARAMETERS : player, position

    findReachablePositions(player, position); // run function

    $(".reach").remove(); // delete old reachable positions
    $(".reach-fight").remove(); // delete old reachable positions leading to fight

    for (var i = 0; i < reachs.length; i++) { // FOR each reachable position

        var reach = document.createElement("button"); // create a <button> element
        $(reach).attr("id", "RE" + i); // set automatic id

        if (reachs[i].fight === 1) { // IF the position is leading to fight
            $(reach).addClass("reach-fight"); // add dedicated class
        } else { // SINON
            $(reach).addClass("reach"); // add normal class
        }

        $("#SQ" + reachs[i].position).append(reach); // incorporate element in related square
    }

    moving = 1; // enable the onclick effect (user can click to move)

}

// PLAYERS MOVEMENTS

// [FUNCTION] MOVE PLAYER

async function moveToPosition() {

    if (moving === 1) { // IF user can click

        $(".reach").remove(); // supprimer les anciennes cases "reach"
        $(".reach-fight").remove(); // supprimer les anciennes cases "reach-fight"

        moving = 0; // disable click effect (so user can't click several times)

        squares[players[turn].position].player = 0; // set square player property to 0 (the player is leaving it)

        var id = this.id.substr(2); // create a variable to get id of the reach object clicked

        var moves = 1; // create a variable to check the number of moves (range)

        while (moves <= reachs[id].range) { // WHILE moves are below range shown by reach object range property
            $("#SQ" + (players[turn].position + (reachs[id].side * moves))).append($("#PL" + turn)); // move player element in the appropriate square element
            if ((squares[players[turn].position + (reachs[id].side * moves)].weapon) === 1) { // IF actual position contains a weapon
                switchItem(turn, squares[players[turn].position + (reachs[id].side * moves)].position, "weapon"); // run the switchItems function
                await sleep(switchFade); // attendre
            } else if ((squares[players[turn].position + (reachs[id].side * moves)].shield) === 1) { // IF actual position contains a shield
                switchItem(turn, squares[players[turn].position + (reachs[id].side * moves)].position, "shield"); // run the switchItems function
                await sleep(switchFade); // attendre
            }

            await sleep(moveFade); // wait between two moves
            moves++; // increase moves variable
        }

        players[turn].position = players[turn].position + reachs[id].side * (moves - 1); // update player position
        squares[players[turn].position].player = 1; // set actual square player property to 1

        info("Le joueur " + (turn + 1) + " s'est déplacé sur la case " + players[turn].position + ".", "#b7b7b7"); // show info in panel

        var runFight = 0;

        for (var i = 0; i < reachs.length; i++) { // FOR each reach object
            if ((reachs[i].position === players[turn].position) && (reachs[i].fight === 1)) { // IF actual position is leading to fight
                runFight = 1; // set variable to 1;
            }
        }

        if (runFight === 1) { // IF variable is 1
            startFight(); // run fight function

        } else { // ELSE
            turn = 1 - turn; // next turn
            var reachableByPlayer = drawReachablePositions(turn, players[turn].position); // show reachable positions for the new player
        }

    }

}

// Add onclick function to reach elements

$(document).on("click", ".reach", moveToPosition);
$(document).on("click", ".reach-fight", moveToPosition);
