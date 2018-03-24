// Données de jeu

var boardSize = 100;
var obstaclesQty = 10;
var weaponsQty = 9;
var shieldsQty = 9;

// Tableaux d'objets

var squares = []; // tableau des cases
var players = []; // tableau des joueurs
var obstacles = []; // tableau des obstacles
var weapons = []; // tableau des armes
var shields = []; // tableau des boucliers
var reachs = []; // tableau des positions atteignables par les joueurs

// Tableaux de données

var remainingsObstacles = []; // tableau des positions attribuables
var remainingsWeapons = []; // tableau des positions attribuables
var remainingsShields = []; // tableau des positions attribuables
var weaponsNames = ["Tomahawk finale", "Arbalète du destin", "Griffes meurtrières", "Bâton de moine", "Boomerang ancestral", "Fléau de la liche", "Sceptre hurlant", "Marteau divin", "Gourdin préhistorique"];
var shieldsNames = ["Protecteur", "Étoile céleste", "Croix de fer", "Signe divin", "Manteau d'araignée", "Bouclier trident", "Échos", "Bouclier viking", "Protection du paladin"];
var initPlayersPosition = [11, 88]; // positions initiales des héros (dégaut : 11, 88)
var colors = ["rgb(200, 50, 50)", "rgb(50, 50, 200)", "rgb(223, 127, 127)", "rgb(127, 127, 223)"]; // couleurs des joueurs (foncées + claires)

// Variables utilitaires

var round = 0; // round
var turn = 0; // tour (joueur)
var moving = 0; // capacité à cliquer
var reachSurrounds = []; // cases atteignables
var reachFight; // case entraînant un combat
var informationsBoard = "open";
var infoLines = 0;
var moveFade = 150;
var switchFade = 200;
var hpFade = 800;
var roundFade = 500;

// Prototypes d'objets

var Square = {

    initSquare: function (number, position) {
        this.number = number; // numéro de la case
        this.position = position; // position de la case
        this.player = 0; // case occupée par un joueur
        this.obstacle = 0; // case occupée par un obstacle
        this.weapon = 0; // case occupée par une arme
        this.shield = 0; // case occupée par un bouclier
    }
};

var Player = {

    initPlayer: function (number, position) {
        this.number = number; // numéro du joueur
        this.position = position; // position du joueur
        this.attack = 1; // attaque du joueur
        this.defense = 1; // défense du joueur
        this.hp = 20; // vie du joueur
        this.weapon = -1; // arme équipée
        this.shield = -1; // bouclier équipé
    }
};

var Obstacle = {

    initObstacle: function (number, position) {
        this.number = number; // numéro de l'obstacle
        this.position = position; // position de l'obstacle
    }
};

var Weapon = {

    initWeapon: function (number, name, position, attack) {
        this.number = number; // numéro de l'arme
        this.name = name; // nom de l'arme
        this.position = position; // position de l'arme
        this.attack = attack; // attaque de l'arme
    }

}

var Shield = {

    initShield: function (number, name, position, defense) {
        this.number = number; // numéro du bouclier
        this.name = name; // nom du bouclier
        this.position = position; // position du bouclier
        this.defense = defense; // défense du bouclier
    }

}

var Reach = {

    initReach: function (player, position, side, range, fight) {
        this.player = player; // joueur pouvant atteindre la case
        this.position = position; // position de la case atteignable
        this.side = side; // côté par rapport au joueur (-10 = top ; +1 = right ; + 10 = bottom ; -1 = left)
        this.range = range; // distance du joueur en case (de 1 à 3)
        this.fight = fight;
    }

}
