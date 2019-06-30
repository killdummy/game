window.onload = init;

var ctxMap, map, widthMap = 900, heightMap = 600;
var imageOpponent = new Image();
imageOpponent.src = "https://forums.nexusmods.com/uploads/profile/photo-thumb-36912170.png?r_=1505345044";
var tiles1 = new Image();
tiles1.src = "https://lh3.googleusercontent.com/Ix_Gy0fDUP1lo2VcjCyhWs60DtAXztdxnlsKffUeZ1j2cZqNuNIZskcWf3vNhdww52_e=w115";
var fireball = new Image();
fireball.src = "https://vignette.wikia.nocookie.net/planetcentauri/images/f/fa/Suffix67.png/revision/latest?cb=20180914154229&path-prefix=ru";
var isPlaying;

var bullet = [];
var bullets = 0, timer = 0;

var i;

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width = widthMap;
	map.height = heightMap;

	startLoop();

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 87:
				player.y -= 15;
				break;
			case 83:
				player.y += 15;
				break;
			case 68:
				player.x += 15;
				break;
			case 65:
				player.x -= 15;
				break;
		}
	});
}

function loop(){
	if(isPlaying){
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
	draw();
}

var opponent = {
	x: 600,
	y: 400,
	pW: 100,
	pH: 100,
	draw: function(){
		ctxMap.drawImage(imageOpponent, 0, 0, 150, 150, this.x, this.y, this.pW, this.pH);
	},
	clear: function(){
		ctxMap.clearRect(this.x, this.y, this.x + this.pW, this.y + this.pH);
	}
}

var player = {
	x: 100,
	y: 100,
	pW: 100,
	pH: 100,
	draw: function(){
		ctxMap.drawImage(tiles1, 0, 0, 150, 150, this.x, this.y, this.pW, this.pH);
	}

}

var drawBullet = {
	draw: function(){
		ctxMap.drawImage(fireball, 0, 0, 100, 100, bullet[i].x, bullet[i].y, 10, 10);
	}
}

var kill = 0;

function draw(){
	ctxMap.clearRect(0, 0, widthMap, heightMap);
	for (i = 0; i < bullet.length; i++){
		bullet[i].x += bullet[i].vx;
		drawBullet.draw();
		if (((bullet[i].x >= opponent.x) && (bullet[i].x <= (opponent.x + opponent.pW))) && ((bullet[i].y >= opponent.y) && (bullet[i].y <= opponent.y + opponent.pH))) kill = 1;
	}

	timer++;

	if (timer % 12 == 0){
		bullets = 0;
	}

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 32:
				if (bullets < 10){
					bullet.push({
						x: player.x + player.pW/2,
						y: player.y + player.pH/2 - 8,
						vx: 10,
						vy: 0,
					});
				bullets++;
				}
				break;
		}
	});

	player.draw();
	opponent.draw();
	if (kill == 1){
		opponent.clear();
	}
}
