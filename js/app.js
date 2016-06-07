//Enums containing the values of various constants used throughout the cpde
var gameboard = {
    ROWS: [0, 60, 140, 225, 310, 395],
    COLS: [0, 101, 202, 303, 404],
    WIDTH: 505,
    HEIGHT: 606
}; 

//Created a parent class from which the Enemy and Player classes can inherit
var Character = function() {
    this.sprite = "";
    this.x = 0;
    this.y = 0;
};

// Draw either the enemy or the player on the screen, depending on the child class.
// Required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; 

// Enemies our player must avoid
var Enemy = function() {
    this.spawnEnemy();
};

// setting inheritance
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);

    this.handleCollision();

    this.spawnEnemyWhenOneGoesOffScreen();
};

//Detects the collision and detection of the player with the enemy and then restarts the game 
Enemy.prototype.handleCollision = function() {
//Uses the global variable for player values
    if ( (Math.abs(this.x - player.x) < 80) && (this.y === player.y) ) {
        // Then there is a collision and need to reposition the Player back to starting block
        player.spawnPlayer();
    }
};

//When enemy goes out of screen then make it reappear
Enemy.prototype.spawnEnemyWhenOneGoesOffScreen = function() {
    if (this.x > gameboard.WIDTH) {
        this.spawnEnemy();
    }
};

Enemy.prototype.spawnEnemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = gameboard.COLS[0] ; //column
    this.y = this.getStartingRow(); //row
    this.speed = this.chooseMovementSpeed();
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
Enemy.prototype.getStartingRow = function() {
    var min = 1;
    var max = 4;
    var rand =  Math.floor( Math.random()*(max-min) ) + min;

    return gameboard.ROWS[rand];
};

//arbitrarily calculates the movement speed of the enemy from a range
Enemy.prototype.chooseMovementSpeed = function() {
    var min = 60;
    var max = 100;
    return Math.floor( Math.random()*(max-min) ) + min;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.spawnPlayer();
};

// setting inheritance
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Checks to see if player has won, and thakes the action upon winning the game
Player.prototype.update = function() {
    if (this.y === gameboard.ROWS[0]) {
        this.handleWin()
    }
};

// Action to take when the player wins
Player.prototype.handleWin = function() {
    this.spawnPlayer();
};

//repositions the player back to the starting position
Player.prototype.spawnPlayer = function() {
    this.sprite = 'images/char-boy.png';
    this.xIndex = 2;
    this.yIndex = 5;
    this.x = gameboard.COLS[2]; //column
    this.y = gameboard.ROWS[5]; //row
};

//Repositions the Player based on the keyboard input
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if (this.xIndex > 0) {
                this.xIndex -= 1;
                this.x = gameboard.COLS[this.xIndex];
            }
            break;
        case 'right':
            if (this.xIndex < (gameboard.COLS.length-1)) {
                this.xIndex += 1;
                this.x = gameboard.COLS[this.xIndex];
            }
            break;
        case 'up':
            if (this.yIndex > 0) {
                this.yIndex -= 1;
                this.y = gameboard.ROWS[this.yIndex];
            }
            break;
        case 'down':
            if (this.yIndex < (gameboard.ROWS.length-1)) {
                this.yIndex += 1;
                this.y = gameboard.ROWS[this.yIndex];
            }
            break;
    }
    this.update();
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
