// INTEGRATION OF INFO IN PANEL

// [FUNCTION] SHOW INFO IN PANEL

function info(info, color) { // PARAMETERS : info to show, <p> color

    var newInfo = document.createElement("p"); // create a <p> element
    $(newInfo).text(info); // set text to info parameter
    $(newInfo).css("color", color); // set text color to color paramet
    $(newInfo).hide(); // hide element
    $("#info-logs").append(newInfo); // incorporate element at the end of the pannel
    $(newInfo).fadeIn(); // show element with a fadeIn

    infoLines++; // increase number of lines wrote

    if (infoLines > 15) { // IF number of lines wrote is above 15
        $("#info-logs").find("p:first").remove(); // delete the first line (older)
        infoLines--; // decrease number of lines wrote
    }

}

// [FUNCTION] HIDE/SHOW PANEL

function infoToggle() {

    if (infoPanel === "open") { // IF the panel is open

        infoClose(); // run function to hide the panel

    } else if (infoPanel === "close") { // IF the panel is closed

        infoOpen(); // run function to open the panel

    }

}

// [FUNCTION] HIDE PANEL

function infoClose() {
    
    $("#info-panel").hide();

    $("#info-toggle-icon").css({
        'background-image': 'url(./img/menu-toggle-right.png)'
    });
    
    infoPanel = "close"; // change value of variable
}

// [FUNCTION] SHOW PANEL

function infoOpen() {
    
    $("#info-panel").show();

    $("#info-toggle-icon").css({
        'background-image': 'url(./img/menu-toggle-left.png)'
    });

    infoPanel = "open"; // change value of variable
}

// ADD AN ONCLICK FUNCTION TO TOGGLE BUTTON

$("#info-toggle").on("click", infoToggle);
