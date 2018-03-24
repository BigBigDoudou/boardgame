// COMBAT ENTRE LES JOUEURS

// [Fonction] Proposition des actions de combat

function startFight() {

    $("#fight-mask").fadeIn(200); // appliquer le masque sur le plateau

    console.log("Le joueur " + (turn + 1) + " attaque le joueur " + (1 - turn + 1) + "."); // afficher les informations dans la console
    informations("Le joueur " + (turn + 1) + " attaque le joueur " + (1 - turn + 1) + ".", "#e06666"); // afficher les informations dans le panneau

    // Créer les éléments graphiques

    var assailantWeaponArrow = document.createElement("arrow"); // créer un élément flèche pour l'arme de l'aissaillant
    var assailantWeapon = document.createElement("attack"); // créer un élément pour l'arme de l'assaillant

    var defenderWeaponArrow = document.createElement("arrow"); // créer un élément flèche pour l'arme du défenseur
    var defenderShieldArrow = document.createElement("arrow"); // créer un élément pour l'arme du défenseur
    var defenderWeapon = document.createElement("attack"); // créer un élément flèche pour le bouclier du défenseur
    var defenderShield = document.createElement("defense"); // créer un élément pour le bouclier du défenseur

    // Ajouter les classes

    $(assailantWeaponArrow).addClass("fight-arrow");
    $(assailantWeapon).addClass("assailant-item");

    $(defenderWeaponArrow).addClass("fight-arrow");
    $(defenderShieldArrow).addClass("fight-arrow");
    $(defenderWeapon).addClass("defender-item");
    $(defenderShield).addClass("defender-item");

    // Définir les propriétés CSS générales

    $(assailantWeapon).css("background-color", colors[turn + 2]);
    $(assailantWeapon).css("background-image", "url('img/weapon" + (players[turn].weapon + 1) + ".png')");

    $(defenderWeapon).css("background-color", colors[1 - turn]);
    $(defenderWeapon).css("background-image", "url('img/weapon" + (players[1 - turn].weapon + 1) + ".png')");
    $(defenderShield).css("background-color", colors[1 - turn]);
    $(defenderShield).css("background-image", "url('img/shield" + (players[1 - turn].shield + 1) + ".png')");

    // Définir l'emplacement des icônes de combat

    var assailantSide;
    var defenderSide;

    switch (players[turn].position - players[1 - turn].position) {

        case -10: // le joueur qui attaque vient d'au-dessus
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

        case 1: // le joueur qui attaque vient de la droite
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

        case 10: // le joueur qui attaque vient d'en dessous
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

        case -1: // le joueur qui attaque vient de la gauche
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

    // Créer les icônes de combat

    $(assailantWeaponArrow).css("border-" + assailantSide + "-color", colors[turn + 2]); // créer les flèches (mettre en couleur une bordure)
    $(defenderWeaponArrow).css("border-" + defenderSide + "-color", colors[1 - turn]);
    $(defenderShieldArrow).css("border-" + defenderSide + "-color", colors[1 - turn]);

    $(assailantWeaponArrow).hide(); // masquer les éléments
    $(assailantWeapon).hide();
    $(defenderWeaponArrow).hide();
    $(defenderShieldArrow).hide();
    $(defenderWeapon).hide();
    $(defenderShield).hide();

    // Ajouter les fonctions au clic

    $(defenderWeapon).on("click", function () {
        chooseAction("attack");
    });

    $(defenderShield).on("click", function () {
        chooseAction("defense");
    });

    // Intégrer les éléments dans le DOM et les afficher en fondu

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

// [Fonction] Choix des actions de combat

function chooseAction(action) {

    // Créer les variables locales
    
    var assailantAttack = players[turn].attack; // attaque de l'assaillant
    var defenderAttack = players[1 - turn].attack; // attaque du défenseur
    var defenderDefense = players[1 - turn].defense; // défense du défenseur

    var assailantDamages = 0; // dégâts réalisés par l'assaillant
    var defenderDamages = 0; // dégâts réalisés par le défenseur

    // Définir les réactions en fonction du choix du joueur attaqué
    
    if (action === "attack") { // SI le défenseur contre-attaque

        console.log("Le joueur " + (1 - turn + 1) + " contre-attaque."); // afficher l'information dans la console
        informations("Le joueur " + (1 - turn + 1) + " contre-attaque.", "#f6b26b"); // afficher les informations dans le panneau
        assailantDamages = assailantAttack; // appliquer les dégâts de l'assaillant
        defenderDamages = defenderAttack; // appliquer les dégâts du défenseur

    } else if (action === "defense") { // SI le défenseur défend

        console.log("Le joueur " + (1 - turn + 1) + " se défend."); // afficher l'information dans la console
        informations("Le joueur " + (1 - turn + 1) + " se défend.", "#f6b26b"); // afficher les informations dans le panneau
        assailantDamages = assailantAttack - defenderDefense; // appliquer les dégâts de l'assaillant réduit de la défense du défenseur
        if (assailantDamages < 0) {
            assailantDamages = 0;
        }

        // Mettre à jour les équipements
        
        if (players[turn].weapon !== -1) { // SI l'assaillant possède une arme
            weapons[players[turn].weapon].attack -= defenderDefense; // réduire les dégâts de l'arme de la défense du défenseur
        }

        if (players[1 - turn].shield !== -1) { // SI le défenseur possède un bouclier
            shields[players[1 - turn].shield].defense -= players[turn].attack; // réduire la défense du bouclier de l'attaque de l'assaillant
        }

        if (players[turn].weapon !== -1) {
            if (weapons[players[turn].weapon].attack <= 0) { // SI l'attaque de l'arme est nulle (arme détruite)
                console.log("L'arme du joueur " + (turn + 1) + " s'est brisée."); // afficher l'information dans la console
                informations("L'arme du joueur " + (turn + 1) + " s'est brisée.", "#76a5af"); // afficher les informations dans le panneau
                weapons[players[turn].weapon].position = -2; // extraire l'arme du jeu
                players[turn].weapon = -1; // enlever l'arme du joueur
                players[turn].attack = 1; // définir l'attaque du joueur à 1
                $("#player" + (turn + 1) + " .player-weapon-attack").text(players[turn].attack); // mettre à jour les statistiques
                $("#player" + (turn + 1) + " .player-weapon-img").attr("src", "img/weapon0.png"); // afficher l'icône d'absence d'arme
            } else { // SINON
                players[turn].attack = weapons[players[turn].weapon].attack; // mettre à jour l'attaque du joueur
                $("#player" + (turn + 1) + " .player-weapon-attack").text(players[turn].attack); // mettre à jour les statistiques
            }
        }

        if (players[1 - turn].shield !== -1) {
            if (shields[players[1 - turn].shield].defense <= 0) { // SI la défense du bouclier est nulle (bouclier détruit)
                console.log("Le bouclier du joueur " + (1 - turn + 1) + " a éclaté en morceaux."); // afficher l'information dans la console
                informations("Le bouclier du joueur " + (1 - turn + 1) + " a éclaté en morceaux.", "#76a5af"); // afficher les informations dans le panneau
                shields[players[1 - turn].shield].position = -2; // extraire le bouclier du jeu
                players[1 - turn].shield = -1; // enlever le bouclier du joueur
                players[1 - turn].defense = 1; // définir la défense du joueur à 1
                $("#player" + (1 - turn + 1) + " .player-shield-defense").text(players[1 - turn].defense); // mettre à jour les statistiquesr
                $("#player" + (1 - turn + 1) + " .player-shield-img").attr("src", "img/shield0.png"); // afficher l'icône d'absence de bouclier
            } else { // SINON
                players[1 - turn].defense = shields[players[1 - turn].shield].defense; // mettre à jour la défense du joueur
                $("#player" + (1 - turn + 1) + " .player-shield-defense").text(players[turn].defense); // mettre à jour les statistiques
            }
        }

    }

    // Supprimer les icônes d'action
    
    $("arrow").remove();
    $("attack").remove();
    $("defense").remove();
    
    // Créer les éléments affichant les dégâts subit

    var assailantHpLost = document.createElement("heart"); // créer un élément pour les dégâts subits l'assaillant
    var defenderHpLost = document.createElement("heart"); // créer un élément pour les dégâts subits le défenseur

    // Identifier la position des éléments
    
    switch (players[turn].position - players[1 - turn].position) {

        case -10: // le joueur qui attaque vient d'au-dessus

            $(assailantHpLost).css({
                'top': '-45px',
                'left': '10px'
            });

            $(defenderHpLost).css({
                'top': '65px',
                'left': '10px'
            });

            break;

        case 1: // le joueur qui attaque vient de la droite

            $(assailantHpLost).css({
                'top': '10px',
                'left': '65px'
            });

            $(defenderHpLost).css({
                'top': '10px',
                'left': '-45px'
            });

            break;

        case 10: // le joueur qui attaque vient d'en dessous

            $(assailantHpLost).css({
                'top': '65px',
                'left': '10px'
            });

            $(defenderHpLost).css({
                'top': '-45px',
                'left': '10px'
            });

            break;

        case -1: // le joueur qui attaque vient de la gauche

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

    // Ajouter les propriétés
    
    $(assailantHpLost).addClass("hp-lost-player" + (turn + 1)); // ajouter la classe
    $(defenderHpLost).addClass("hp-lost-player" + (1 - turn + 1)); // ajouter la classe
    $(assailantHpLost).text("- " + defenderDamages); // indiquer les points de vie perdus dans l'icône
    $(defenderHpLost).text("- " + assailantDamages); // indiquer les points de vie perdus dans l'icône
    $(assailantHpLost).hide(); // masquer l'élément
    $(defenderHpLost).hide(); // masquer l'élément
    $("#SQ" + players[1 - turn].position).append(defenderHpLost);
    $("#SQ" + players[turn].position).append(assailantHpLost);

    // Afficher les éléments dans le DOM
    
    if ((players[1 - turn].hp - assailantDamages) <= 0) { // SI l'assaillant tue le défenseur
        $(defenderHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // afficher puis masquer uniquement pour le défenseur
    } else { //SINON
        $(defenderHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // afficher puis masquer pour le défenseur
        $(assailantHpLost).fadeIn(hpFade).delay(hpFade).fadeOut(hpFade); // afficher puis masquer pour l'attaquant
    }
    
    // Appliquer les dégâts et définir la suite

    setTimeout(function () {

        players[1 - turn].hp -= assailantDamages; // réduire la vie du défenseur des dommages de l'aissaillant 
        if (players[1 - turn].hp <= 0) { // SI le défenseur n'a plus de vie
            players[1 - turn].hp = 0; // mettre la vie à 0
            console.log("Le joueur " + (1 - turn + 1) + " est mort ! Le joueur " + (turn + 1) + " a gagné !"); // afficher l'information dans la console
            informations("Le joueur " + (1 - turn + 1) + " est mort ! Le joueur " + (turn + 1) + " a gagné !", "#e06666"); // afficher les informations dans le panneau
            endGame(turn); // lancer la fonction de fin de partie
        } else {
            console.log("Le joueur " + (1 - turn + 1) + " a perdu " + assailantDamages + " points de vie."); // afficher l'information dans la console
            informations("Le joueur " + (1 - turn + 1) + " a perdu " + assailantDamages + " points de vie.", "#e06666"); // afficher les informations dans le panneau
            players[turn].hp -= defenderDamages; // réduire la vie de l'aissaillant des dommages du défenseur
            if (players[turn].hp <= 0) { // SI l'assailant n'a plus de vie
                players[turn].hp = 0; // mettre la vie à 0
                console.log("Le joueur " + (turn + 1) + " est mort ! Le joueur " + (1 - turn + 1) + " a gagné !"); // afficher l'information dans la console
                informations("Le joueur " + (turn + 1) + " est mort ! Le joueur " + (1 - turn + 1) + " a gagné !", "#e06666"); // afficher les informations dans le panneau
                endGame(1 - turn); // lancer la fonction de fin de partie
            } else { // SINON
                console.log("Le joueur " + (turn + 1) + " a perdu " + defenderDamages + " points de vie."); // afficher l'information dans la console
                informations("Le joueur " + (turn + 1) + " a perdu " + defenderDamages + " points de vie.", "#e06666"); // afficher les informations dans le panneau
                $("#fight-mask").hide(); // cacher le masque
                turn = 1 - turn; // changer le joueur (0 donne 1 et 1 donne 0)
                newRound(turn); // démarrer un nouveau tour
            }
        }

        $("#player" + (1 - turn + 1) + " .player-hp").text(players[1 - turn].hp); // mettre à jour les statistiques
        $("#player" + (turn + 1) + " .player-hp").text(players[turn].hp); // mettre à jour les statistiques
        $("#player" + (1 - turn + 1) + " .player-hp-bar").css("width", (players[1 - turn].hp / 20 * 128) + "px"); // mettre à jour la barre de vie
        $("#player" + (turn + 1) + " .player-hp-bar").css("width", (players[turn].hp / 20 * 128) + "px"); // mettre à jour la barre de vie

    }, hpFade * 3);

}

// [Fonction] Affichage de l'écran de fin

function endGame(player) {

    // Masquer le plateau avec le masque
    
    $("#end-mask").show();
    
    // Mettre à jour les éléments
    
    $("#winner-img").css("background-color", colors[player]);
    $("#winner-img").css("background-image", "url('img/player" + (player + 1) + ".png')")
    $("#winner-player").text("Le joueur " + (player + 1) + " a vaincu !")
    $("#winner-player").text("Le joueur " + (player + 1) + " a vaincu !")

}
