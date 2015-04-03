// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var rowArray = [56, 139, 222]; // array of y values for each row of bugs
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += 230*this.speed * dt;

    if (this.x > 500) { // bug goes off of canvas
      this.x = 0;
      var row = rowArray[Math.floor(Math.random() * rowArray.length)];
      this.y = row;
      // We set a lower and a higher speed so bugs dont move to slow or very fast
	  var lowSpeed = 0.3; 
	  var highSpeed = 0.9; 
      this.speed = (Math.random() * (lowSpeed-highSpeed)+highSpeed);

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.init = function(){
    this.x = getRandomInt(-250, -100);
    //this.y = lines[randomLineIndex()];
    this.speed = getRandomInt(100, 250);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player =function(x,y){
	this.sprite = 'images/char-boy.png';
	this.x=x;
	this.y=y;
};

Player.prototype.update=function(dt){
	this.checkCollisions();
	if( this.y<20){
		player.startOver();
	}
};

Player.prototype.render=function(){
	//ctx.clearRect((this.sprite), this.x, this.y);
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput=function(code){
	//we check to see which button is clicked so we fire respective
	//alert(code);
	var curx=this.x;
	var cury=this.y;
	if (code == 'left' && this.x > 0){
        this.x = this.x - 101;}
    if (code == 'right' && this.x < 304){
        this.x = this.x + 101;}
    if (code == 'up' && this.y >0){
        this.y = this.y - 83;
		ctx.clearRect((this.sprite), curx, cury);
		}
    if (code == 'down' && this.y < 380){
        this.y = this.y + 83;
		}
	
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
	//alert('mesa');
	var enemy = new Enemy();
	allEnemies.push(enemy);
	enemy.x = 250/i;
	enemy.y = rowArray[i];
	enemy.speed = 1;   
}


// Place the player object in a variable called player
var player =  new Player(200,380);


Player.prototype.startOver = function() {
    this.x = 200;
    this.y = 380;
};




// We check collisions
Player.prototype.checkCollisions=function () {
    allEnemies.forEach(function(enemy) {
             if(enemy.x < player.x + 50 &&
                enemy.x + 50 > player.x &&
                enemy.y < player.y + 50 &&
                enemy.y + 50 > player.y) {
                    player.startOver();
                }
            });
};

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