// SWITCHING ITEMS

// [FUNCTION] SWITCH ITEM

function switchItem(player, position, type) { // PARAMETERS : player, position, item type

    var itemBefore; // item before switch
    var itemAfter; // item after switch
    var itemArray; // array containing items of this type
    var itemIdRoot; // root of id (two first letters uppercase)
    var itemBeforeLvl; // level of before item
    var itemAfterLvl; // level of after item

    if (type === "weapon") { // IF item is a weapon
        itemArray = weapons; // set array to weapons
        itemBefore = players[player].weapon; // set item before to player weapon
        itemIdRoot = "#WE"; // set item root to #WE
    } else if (type === "shield") { // IF item is a weapon
        itemArray = shields; // "
        itemBefore = players[player].shield; // "
        itemIdRoot = "#SH"; // "
    }

    for (var i = 0; i < itemArray.length; i++) { // FOR each item (weapon or shield)

        if (itemArray[i].position === position) { // IF the position of item is the position in paramet

            itemAfter = i; // set variable to item found

            // Animation

            $("#switch-arrow").css("border-top-color", colors[player]); // set CSS properties
            $("#switch").css("background-color", colors[player]); // "
            $("#switch-before").css("background-color", colors[player]); // "
            $("#switch-after").css("background-color", colors[player]); // "
            $("#SQ" + position).append($("#switch-arrow")); // incorporate icons
            $("#SQ" + position).append($("#switch")); // "
            $("#SQ" + position).append($("#switch-before")); // "
            $("#SQ" + position).append($("#switch-after")); // "

            if (itemBefore >= 0) { // IF player had an item of this type before
                $("#switch").css("background-image", "url('img/switch-arrow.png')"); // set CSS properties
                $("#switch-before").css("background-image", "url('img/" + type + (itemBefore + 1) + ".png')");
                $("#switch-after").css("background-image", "url('img/" + type + (itemAfter + 1) + ".png')");
                $("#switch-before").show(1).delay(switchFade).hide(1); // show temporarly
                $("#switch-after").show(1).delay(switchFade).hide(1); // "
            } else { // ELSE
                $("#switch").css("background-image", "url('img/" + type + (itemAfter + 1) + ".png')"); // set CSS properties
            }

            $("#switch-arrow").show(1).delay(switchFade).hide(1); // show temporarly
            $("#switch").show(1).delay(switchFade).hide(1); // "

            // Update player stats

            if (type === "weapon") { // IF item is a weapon
                itemAfterLvl = itemArray[i].attack; // get attack stats (used to info)
                players[player].weapon = itemAfter; // change weapon
                players[player].attack = itemArray[itemAfter].attack; // update attack stats
            } else if (type === "shield") { // "
                itemAfterLvl = itemArray[i].defense; // "
                players[player].shield = itemAfter; // "
                players[player].defense = itemArray[itemAfter].defense; // "
            }

            $("#player" + (turn + 1) + " .player-" + type + "-img").attr("src", "img/" + type + (itemAfter + 1) + ".png"); // update icon in player panel

            if (type === "weapon") {
                $("#player" + (turn + 1) + " .player-weapon-attack").text(players[turn].attack); // update stats in player panel
            } else if (type === "shield") {
                $("#player" + (turn + 1) + " .player-shield-defense").text(players[turn].defense); // "
            }

            // Replace item

            if (itemBefore >= 0) { // If player had an item of this type before

                if (type === "weapon") {
                    itemBeforeLvl = itemArray[i].attack; // get before attack stats (used to info)
                } else if (type === "shield") {
                    itemBeforeLvl = itemArray[i].defense; // "
                }

                itemArray[itemBefore].position = position; // set before item position to actual position (dropped by player)
                $("#SQ" + position).append($(itemIdRoot + itemBefore)); // incorporate before item in DOM
                $(itemIdRoot + itemBefore).show(); // show before utem

                info("Le joueur " + (player + 1) + " a posé '" + itemArray[itemBefore].name + "' (" + itemBeforeLvl + ") et ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ").", "#76a5af"); // show info in panel

            } else { // If player had NOT an item of this type before

                squares[position].weapon = 0; // set presence of weapon to 0
                squares[position].shield = 0; // "
               
                info("Le joueur " + (player + 1) + " a ramassé '" + itemArray[itemAfter].name + "' (" + itemAfterLvl + ").", "#76a5af"); // show info in panel
            }

            // Hide new item from the board

            itemArray[itemAfter].position = -1; // extract new item from board
            $(itemIdRoot + itemAfter).hide(); // hide new item

            break; // stop loop (only one item can be in a given position)

        }

    }
}

// [FUNCTION] SHOW ITEMS LEVEL

function showItemsLevel() {

    var id = Number(this.id.substr(2)); // get this id
    var type = $(this).attr("class"); // get this class

    $(this).css("background-image", "none"); // hide background image

    if (type === "weapon") { // IF item is a weapon

        if ($(this).parent().parent().hasClass("rule-example") === true) { // IF it's in the rules page
            $(this).text("4"); // show 4
        } else { // ELSE (in the game)
            $(this).text(weapons[id].attack); // show attack
        }
    } else { // IF item is a shield

        if ($(this).parent().parent().hasClass("rule-example") === true) { // "
            $(this).text("2"); // "
        } else { // "
            $(this).text(shields[id].defense); // "
        }

    }

}

// [FUNCTION] HIDE ITEMS LEVEL

function hideItemsLevel() {

    var id = Number(this.id.substr(2)); // get this id
    var type = $(this).attr("class"); // get this class

    $(this).text(""); // remove text

    if ($(this).parent().parent().hasClass("rule-example") === true) { // IF it's in the rules page
        $(this).css("background-image", "url('img/weapon1.png')") // show first weapon image
    } else { // ELSE
        $(this).css("background-image", "url('img/" + type + (id + 1) + ".png')") // show item image
    }

}

// ADD ONMOUSEOVER FUNCTION

$(document).on("mouseover", ".weapon", showItemsLevel);
$(document).on("mouseover", ".shield", showItemsLevel);

$(document).on("mouseout", ".weapon", hideItemsLevel);
$(document).on("mouseout", ".shield", hideItemsLevel);
