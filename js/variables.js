// GAME DATAS

var boardSize = 100;
var obstaclesQty = 10;
var weaponsQty = 9;
var shieldsQty = 9;

// OBJECTS ARRAYS

var squares = [];
var players = [];
var obstacles = [];
var weapons = [];
var shields = [];
var reachs = [];

// DATAS ARRAYS

var availablePositionsForObstacles = [];
var availablePositionsForWeapons = [];
var availablePositionsForShields = [];
var weaponsNames = ["Tomahawk finale", "Arbalète du destin", "Griffes meurtrières", "Bâton de moine", "Boomerang ancestral", "Fléau de la liche", "Sceptre hurlant", "Marteau divin", "Gourdin préhistorique"];
var shieldsNames = ["Protecteur", "Étoile céleste", "Croix de fer", "Signe divin", "Manteau d'araignée", "Bouclier trident", "Échos", "Bouclier viking", "Protection du paladin"];
var initPlayersPosition = [11, 88]; // initial positions (default : 11, 88)
var colors = ["rgb(200, 50, 50)", "rgb(50, 50, 200)", "rgb(223, 127, 127)", "rgb(127, 127, 223)"]; // players colors (dark and light)

// TOOL VARIABLES

var round = 0;
var turn = 0;
var moving = 0;
var reachSurrounds = [];
var reachFight;
var infoPanel = "open";
var infoLines = 0;
var moveFade = 150;
var switchFade = 750;
var hpFade = 1000;
var roundFade = 1000;

// OBJECTS PROTOTYPES

var Square = {
    initSquare: function (number, position) {
        this.number = number;
        this.position = position;
        this.player = 0; // occupied by player
        this.obstacle = 0; // occupied by obstacle
        this.weapon = 0; // occupied by weapon
        this.shield = 0; // occupied by shield
    }
};

var Player = {
    initPlayer: function (number, position) {
        this.number = number;
        this.position = position;
        this.attack = 1; // player attack (without item = 1)
        this.defense = 1; // player defense (without item = 1)
        this.hp = 20; // player hp (health points)
        this.weapon = -1; // weapon equiped (-1 = none)
        this.shield = -1; // shield equiped (-1 = none)
    }
};

var Obstacle = {
    initObstacle: function (number, position) {
        this.number = number;
        this.position = position;
    }
};

var Weapon = {
    initWeapon: function (number, name, position, attack) {
        this.number = number;
        this.name = name; // name of the weapon (for info board)
        this.position = position;
        this.attack = attack;
    }
};

var Shield = {
    initShield: function (number, name, position, defense) {
        this.number = number;
        this.name = name; // name of the shield (for info board)
        this.position = position;
        this.defense = defense;
    }
};

var Reach = {
    initReach: function (player, position, side, range, fight) {
        this.player = player; // player who can reach the position
        this.position = position; // position
        this.side = side; // side related to player (-10 = top ; +1 = right ; + 10 = bottom ; -1 = left) - this property is not used but still kept because could be usefull for animation
        this.range = range; // range between player and reachable position (from 1 to 3)
        this.fight = fight; // 0 by default, 1 if moving the player here lead to a fight
    }
};
