// [FUNCTION] START A NEW RUN

function newRound(turn) { // PARAMETERS : turn

    round++; // increase turn

    info("*** ROUND " + round + " ***", "#ffd966"); // show info in panel

    // Reset values

    for (var i = 0; i < players.length; i++) { // FOR each player
        squares[players[i].position].player = 0; // set old player positions to 0
        players[i].position = initPlayersPosition[i]; // change players positions to initial values
        squares[players[i].position].player = 1; // set intial positions to 1
        $("#SQ" + (players[i].position)).append($("#PL" + i)); // move players to initial positions in DOM
    }
    
    if (round > 1) { // IF it's not first round
        repositionItems(); // reposition items
    }

    $("#round").text("Round " + round); // set text to new round
    $("#round").fadeIn(roundFade).delay(roundFade).fadeOut(roundFade); // show round

    setTimeout(function () { // use setTimeout to delay the function
        drawReachablePositions(turn, players[turn].position); // show reachable positions
    }, roundFade * 3);

}

// [FUNCTION] REPOSITION ITEMS

async function repositionItems() {

    for (var h = 0; h < squares.length; h++) { // FOR each positions
        squares[h].weapon = 0; // remove weapon
        squares[h].shield = 0; // remove shield
    }

    for (var i = 0; i < weapons.length; i++) { // FOR each weapon

        if (weapons[i].position > 0) { // IF weapon is on board (not deleted, not equiped)
            $("weapon").hide(); // hide element
            availablePositionsForWeapons.push(weapons[i].position); // add position to available positions
        }

    }

    for (var j = 0; j < shields.length; j++) { // FOR each shield

        if (shields[j].position > 0) { // IF shield is on board (not deleted, not equiped)
            $("shield").hide(); // hide element
            availablePositionsForShields.push(shields[j].position); // add position to available positions
        }

    }

    for (var k = 0; k < weapons.length; k++) { // FOR each weapon

        if (weapons[k].position > 0) { // IF weapon is on board (not deleted, not equiped)
            weapons[k].position = elementsPosition(availablePositionsForWeapons); // define new position
            squares[weapons[k].position].weapon = 1; // add weapon presence
            removeFromAvailablePositions(availablePositionsForWeapons, weapons[k].position, 1); // delete position from available positions
            $("#SQ" + weapons[k].position).append($("#" + weapons[k].number)); // add weapon in DOM
            await sleep(25); // wait
            $("#" + weapons[k].number).fadeIn(); // show element
        }

    }

    for (var l = 0; l < shields.length; l++) { // FOR each shield

        if (shields[l].position > 0) { // IF shield is on board (not deleted, not equiped)
            shields[l].position = elementsPosition(availablePositionsForShields); // define new position
            squares[shields[l].position].shield = 1; // add shield presence
            removeFromAvailablePositions(availablePositionsForShields, shields[l].position, 1); // delete position from available positions
            $("#SQ" + shields[l].position).append($("#" + shields[l].number)); // add shield in DOM
            await sleep(25); // wait
            $("#" + shields[l].number).fadeIn(); // show element
        }

    }
}
