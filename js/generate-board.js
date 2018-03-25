// BOARD GENERATION

// [FUNCION] CREATE ARRAYS FOR AVAILABLE POSITIONS

function generateAvailablePositions(size) {

    for (var i = 0; i < size; i++) { // FOR size of the board
        availablePositionsForObstacles.push(i); // add available position for obstacles
        availablePositionsForWeapons.push(i); // add available position for weapons
        availablePositionsForShields.push(i); // add available position for shields
    }
}

// [FUNCION] GENERATE SQUARES

function generateSquares(size) {

    for (var i = 0; i < size; i++) { // FOR size of the board
        var square = Object.create(Square); // create object
        square.initSquare("SQ" + i, i); // apply properties
        squares.push(square); // push in array
    }
}

// [FUNCION] GENERATE PLAYERS

function generatePlayers() {

    for (var i = 0; i < 2; i++) { // FOR number of players
        var player = Object.create(Player); // create object
        var playerPosition = initPlayersPosition[i]; // set position
        player.initPlayer("PL" + i, playerPosition); // apply properties
        players.push(player); // push in array
        squares[playerPosition].player = 1; // define dedicated square property to 1
    }
}

// [FUNCION] GENERATE OBSTACLES

function generateObstacles(quantity) {

    for (var i = 0; i < quantity; i++) { // FOR number of obstacles
        var obstacle = Object.create(Obstacle); // create object
        var obstaclePosition = elementsPosition(availablePositionsForObstacles); // set random position
        obstacle.initObstacle("OB" + i, obstaclePosition); // apply properties
        obstacles.push(obstacle); // push in array
        squares[obstaclePosition].obstacle = 1; // define dedicated square property to 1
        removeFromAvailablePositions(availablePositionsForObstacles, obstaclePosition, 1); // delete position (and surroundings) value to available positions
    }
}

// [FUNCION] GENERATE WEAPONS

function generateWeapons(quantity) {

    for (var i = 0; i < quantity; i++) { // FOR number of weapons
        var weapon = Object.create(Weapon); // create object
        var weaponName = weaponsNames[i]; // set name property from names array
        var weaponPosition = elementsPosition(availablePositionsForWeapons); // set random position
        var weaponLevel = Math.floor(Math.random() * 3) + 5; // set random attack
        weapon.initWeapon("WE" + i, weaponName, weaponPosition, weaponLevel); // apply properties
        weapons.push(weapon); // push in array
        squares[weaponPosition].weapon = 1; // define dedicated square property to 1
        removeFromAvailablePositions(availablePositionsForWeapons, weaponPosition, 1); // delete position (and surroundings) value to available positions
    }
}

// [FUNCION] GENERATE SHIELDS

function generateShields(quantity) {

    for (var i = 0; i < quantity; i++) { // FOR number of shields
        var shield = Object.create(Shield); // create object
        var shieldName = shieldsNames[i]; // set name property from names array
        var shieldPosition = elementsPosition(availablePositionsForShields); // set random position
        var shieldLevel = Math.floor(Math.random() * 3) + 2; // set random defense
        shield.initShield("SH" + i, shieldName, shieldPosition, shieldLevel); // apply properties
        shields.push(shield); // push in array
        squares[shieldPosition].shield = 1; // define dedicated square property to 1
        removeFromAvailablePositions(availablePositionsForShields, shieldPosition, 1); // delete position (and surroundings) value to available positions
    }
}

// POSITIONNING CONTROL

// [FUNCTION] REMOVE AVAILABLE POSITIONS

function removeFromAvailablePositions(array, position, range) { // PARAMETERS : available positions array, position, deleting range

    var indexObstacles = availablePositionsForObstacles.indexOf(position); // get index of position value in array
    var indexWeapons = availablePositionsForWeapons.indexOf(position); // ""
    var indexShields = availablePositionsForShields.indexOf(position); // ""

    if (indexObstacles !== -1) { // IF value is not -1 (value not found with indexOf)
        availablePositionsForObstacles.splice(indexObstacles, 1); // remove value from available positions
    };

    if (indexWeapons !== -1) { // "
        availablePositionsForWeapons.splice(indexWeapons, 1); // "
    };

    if (indexShields !== -1) { // "
        availablePositionsForShields.splice(indexShields, 1); // "
    };

    var surrounds = findSurroundingPositions(position); // define positions surrouding actual position
    if (range === 1) { // IF range is 1 (= delete 1 case around from available positions)
        for (var i = 0; i < surrounds.length; i++) { // FOR each surrounding position
            var index = array.indexOf(surrounds[i]); // get index of position value in array
            if (index !== -1) { // "
                array.splice(index, 1); // "
            }
        }
    }

}

// [FUNCTION] INITIALE REMOVE AVAILABLE POSITIONS

function initRemoveFromAvailablePositions() {

    for (var i = 0; i < initPlayersPosition.length; i++) { // FOR each player

        removeFromAvailablePositions(availablePositionsForObstacles, initPlayersPosition[i], 1); // remove player position from available positions for obstacles
        removeFromAvailablePositions(availablePositionsForWeapons, initPlayersPosition[i], 1); // "
        removeFromAvailablePositions(availablePositionsForShields, initPlayersPosition[i], 1); // "

        var initReachablePositions = findReachablePositions(i, initPlayersPosition[i]); // define positions that player can reach

        for (var j = 0; j < initReachablePositions.length; j++) { // FOR each reachable position
            removeFromAvailablePositions(availablePositionsForWeapons, initReachablePositions[j].position, 0); // remove position from available positions for weapons
            removeFromAvailablePositions(availablePositionsForShields, initReachablePositions[j].position, 0); // "
        }

    }
}

// [FUNCTION] SET RANDOM POSITIONS

function elementsPosition(array) { // PARAMETERS : array of available positions

    var pick = array[Math.floor(Math.random() * array.length)]; // pick a random value in the array

    return pick; // return picked value
}

// INTCORPORATION OF OBJECTS IN DOM

// [FUNCTION] CREATE ELEMENTS

async function draw(array, object, delay) {

    var eltName = object; // create a variable to element
    var idRoot = object.substring(0, 2).toUpperCase(); // create a variable to define id root (= two first letters in uppercase)

    for (var i = 0; i < array.length; i++) { // FOR each element
        elt = document.createElement(eltName) // create an element in DOM
        $(elt).attr("id", idRoot + i); // apply automatic id
        $(elt).addClass(eltName); // add class
        $(elt).hide(); // hide element

        if (object === "player" || object === "weapon" || object === "shield") { // IF element is player, weapon or shield
            $(elt).css("background-image", "url('img/" + object + (i + 1) + ".png')"); // add image
        }

        if (object === "square") { // IF element is square
            $("#board-elts").append(elt); // incorporate element in board

        } else { // ELSE
            $("#SQ" + array[i].position).append(elt); // incorporate element in related square (got by id)
        }

        if (delay === 1) { // IF delay parameter is set to 1
            $(elt).fadeIn(); // show element with a fadeI,
            await sleep(25); // wait between each element incorporation
        } else { // ELSE
            $(elt).show(); // show element instantly
        }

    }

}
