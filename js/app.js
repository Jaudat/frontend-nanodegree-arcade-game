//Enums containing the values of various constants used throughout the cpde
var gameboard = {
    NUM_OF_ROWS: 6,
    NUM_OF_COLS: 5,
    // ROW_ZERO: 0,
    ROW_ONE: 60,
    ROW_TWO: 140,
    ROW_THREE: 225,
    ROW_FOUR: 310,
    ROW_FIVE: 395,
    COL_ZERO: 0,
    COL_ONE: 101,
    COL_TWO: 202,
    COL_THREE: 303,
    COL_FIVE: 404
}; 

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = gameboard.COL_ZERO ; //column
    this.y = this.getStartingRow(); //row
    this.movement = this.chooseMovementSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
Enemy.prototype.getStartingRow = function() {
    var row1 = 1;
    var row2 = 4;
    var rand =  Math.floor( Math.random()*(max-min) ) + min

    switch(rand) {
        case 1:
            return gameboard.ROW_ONE;
        case 2:
            return gameboard.ROW_TWO;
        case 3:
           return gameboard.ROW_THREE
    }
};

Enemy.prototype.chooseMovementSpeed = function() {

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 2 * gameboard.COL_WIDTH; //column
    this.y = 5 * gameboard.ROW_WIDTH; //row
};

Player.prototype.update = function() {
    //TODO: Finish function
};

Player.prototype.render = function() {
    //TODO: Finish function
};

Player.prototype.handleInput = function() {
    //TODO: Finish function
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
