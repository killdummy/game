window.onload = body;

var ctxMap, map;
var ctxFire, fire, ammo = [];
var ctxEn, en, bad = [];
var mapWidth = 900, mapHeight = 600;
var background = new Image();
background.src = "http://arvinmoses.com/wp-content/uploads/2015/02/screenshot010.png";
var player, ctxPlayer;
var tiles1 = new Image();
tiles1.src = "https://lh3.googleusercontent.com/Ix_Gy0fDUP1lo2VcjCyhWs60DtAXztdxnlsKffUeZ1j2cZqNuNIZskcWf3vNhdww52_e=w115";
var imageOpponent = new Image();
imageOpponent.src = "https://forums.nexusmods.com/uploads/profile/photo-thumb-36912170.png?r_=1505345044";
var fireball = new Image();
fireball.src = "https://vignette.wikia.nocookie.net/planetcentauri/images/f/fa/Suffix67.png/revision/latest?cb=20180914154229&path-prefix=ru";

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function body() {
	spawnBad(7);

	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	player = document.getElementById("player");
	ctxPlayer = player.getContext("2d");

	fire = document.getElementById("fire");
	ctxFire = player.getContext("2d");

	en = document.getElementById("enemy");
	ctxEn = en.getContext("2d");

	fire.width = mapWidth;
	fire.height = mapHeight;

	en.width = mapWidth;
	en.height = mapHeight;

	map.width = mapWidth;
	map.height = mapHeight;

	soldier = new Player();

	player.width = mapWidth;
	player.height = mapHeight;

	drawBg();

	startLoop();

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 87:
				soldier.up();
				break;
			case 83:
				soldier.down();
				break;
			case 68:
				soldier.right();
				break;
			case 65:
				soldier.left();
				break;
			case 32:
				shot();
				break;
		}
	});
}

var isPlaying;

function loop(){
	if(isPlaying){
		draw();
		update();
		
		requestAnimFrame(loop);
	}
}

function startLoop(){
	isPlaying = true;
	loop();
}

function stopLoop(){
	isPlaying = false;
}

function update(){
	for (var i = 0; i < bad.length; i++){
		bad[i].move();
	}
}

function shot(){
	ammo = new gun();
	ammo.draw();
	ammo.bum();
}

function spawnBad(count){
	for (var i = 0; i < count; i++){
		bad[i] = new Opponent();
	}
}

function draw(){
	clearCtxOpponent();
	clearCtxFire();
	soldier.draw();
	for (var i = 0; i < bad.length; i++){
		bad[i].draw();
	}
	
}

function Player(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 350;
	this.drawY = 200;
	this.width = 125;
	this.height = 125;

	this.speed = 5;
}

function Opponent(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = Math.floor(Math.random() * mapWidth) + mapWidth;
	this.drawY = Math.floor(Math.random() * mapHeight);
	this.width = 125;
	this.height = 125;

	this.speed = 5;
}

function gun(){
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 200;
	this.drawY = 200;
	this.width = 10;
	this.height = 10;
}

gun.prototype.draw = function(){
	ctxFire.drawImage(fireball, this.srcX, this.srcY, 10, 10, this.drawX, this.drawY, this.width, this.width);
}

gun.prototype.bum = function(){
	this.drawX += 5;
}

Opponent.prototype = {
	move: function(){
		if (this.drawX > 0){
			this.drawX -= 2;
		}else{
			this.drawX = Math.floor(Math.random() * mapWidth) + mapWidth;
			this.drawY = Math.floor(Math.random() * (mapHeight-100));
		}
	}
}

Opponent.prototype.draw = function(){
	ctxEn.drawImage(imageOpponent, this.srcX, this.srcY, 150, 150, this.drawX, this.drawY, this.width, this.width);
}

Player.prototype = {
	right: function(){
		if (this.drawX < 780) this.drawX += 30;
	},
	left: function(){
		if (this.drawX > 30) this.drawX -= 30;
	},
	up: function(){
		if (this.drawY > 20) this.drawY -= 30;
	},
	down: function(){
		if (this.drawY < 480) this.drawY += 30;
	},
}



Player.prototype.draw = function(){
	clearCtxPlayer();
	ctxPlayer.drawImage(tiles1, this.srcX, this.srcY, 150, 150, this.drawX, this.drawY, this.width, this.width);
}

function clearCtxPlayer(){
	ctxPlayer.clearRect(0, 0, mapWidth, mapHeight);
}

function clearCtxOpponent(){
	ctxEn.clearRect(0, 0, mapWidth, mapHeight);
}
function clearCtxFire(){
	ctxFire.clearRect(0, 0, mapWidth, mapHeight);
}

function drawBg(){
	ctxMap.drawImage(background, 0, 0, 1200, 1000, 0, 0, mapWidth, mapHeight);
}
