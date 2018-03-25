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

    if (infoBoard === "open") { // IF the panel is open

        infoClose(); // run function to hide the panel

    } else if (infoBoard === "close") { // IF the panel is closed

        infoOpen(); // run function to open the panel

    }

}

// [FUNCTION] HIDE PANEL

function infoClose() {

    // Set CSS properties
    
    $("#info").css({
        'width': '40px',
        'padding': '40px 10px'
    });

    $("#info > p > span:first-child").hide();
    $("#info-logs").hide();
    $("#info > hr").hide();

    $("#info-toggle").css({
        'background-image': 'url(./img/menu-toggle-right.png)'
    });

    $("#global-wrapper").css({
        'margin-left': '60px'
    });
    
    infoBoard = "close"; // change value of variable
}

// [FUNCTION] SHOW PANEL

function infoOpen() {
    
    // Set CSS properties

    $("#info").css({
        'width': '250px',
        'padding': '40px 20px'
    });

    $("#info > p > span:first-child").show();
    $("#info-logs").show();
    $("#info > hr").show();

    $("#info-toggle").css({
        'background-image': 'url(./img/menu-toggle-left.png)'
    });

    $("#global-wrapper").css({
        'margin-left': '270px'
    });

    infoBoard = "open"; // change value of variable
}

// ADD AN ONCLICK FUNCTION TO TOGGLE BUTTON

$("#info-toggle").on("click", infoToggle);
