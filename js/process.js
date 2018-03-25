// INITIALISATION

$(window).on("load", function () { // onload

    // Hide elements

    $("#wrapper").hide();
    $("#end-mask").hide();
    $("#fight-mask").hide();
    $("#round").hide();

    // Check window width

    if ($(window).width() < 1240) { // IF window width is below 1400px
        infoToggle(); // close panel
    }

})

// [FUNCTION] HIDE/SHOW PANEL ON WINDOW RESIZINF

$(window).on("resize", debounce(function () { // use debounce function to prevent overload
    if ($(window).width() < 1240) { // IF window width is below 1400px
        infoClose(); // close panel
    } else { // ELSE
        infoOpen(); // open panel
    }
}, 50)); // prevent function call (max one each 50ms)


// [FUNCTION] START GAME

$("#first-game").on("click", function () { // on first game button clicked
    $("#introduction").remove(); // remove rules page
    $("#wrapper").show(); // show game
    newGame(); // run a new game
});

$("#new-game").on("click", function () { // on new game button clicked
    newGame(); // run a new game
});
