window.onload = init;

var ctxMap, map, widthMap = 1200, heightMap = 600;
var imageOpponent = new Image();
imageOpponent.src = "https://forums.nexusmods.com/uploads/profile/photo-thumb-36912170.png?r_=1505345044";
var tiles1 = new Image();
tiles1.src = "https://lh3.googleusercontent.com/Ix_Gy0fDUP1lo2VcjCyhWs60DtAXztdxnlsKffUeZ1j2cZqNuNIZskcWf3vNhdww52_e=w115";
var fireball = new Image();
fireball.src = "https://vignette.wikia.nocookie.net/planetcentauri/images/f/fa/Suffix67.png/revision/latest?cb=20180914154229&path-prefix=ru";
var isPlaying;

var bullet = [];
var enemies = [];
var bullets = 0, timer = 0;

var i, j;

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
	spawnOpponent(10);

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

function spawnOpponent(count){
	for (i = 0; i < count; i++){
		enemies.push({
			x: Math.floor(Math.random() * widthMap) + widthMap,
			y: Math.floor(Math.random(0, 0.8) * heightMap),
			pW: 100,
			pH: 100,
		});
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

var drawEnemies = {
	draw: function(){
		ctxMap.drawImage(imageOpponent, 0, 0, 100, 100, enemies[i].x, enemies[i].y, 100, 100);
	} 
}

var score = 0;

function draw(){
	ctxMap.clearRect(0, 0, widthMap, heightMap);
	for (i = 0; i < bullet.length; i++){
		bullet[i].x += bullet[i].vx;
		drawBullet.draw();
		if (bullet[i].x > widthMap) bullet.splice(i, 1);
	}

	for (i = 0; i < enemies.length; i++){
		enemies[i].x -= 3;
		drawEnemies.draw();
		if (enemies[i].x < 0) {
			alert(score);
			score = 0;
			document.location.reload(true);
		}
		if (enemies[i].y > 500) {
			enemies[i].x = Math.floor(Math.random() * widthMap) + widthMap;
			enemies[i].y = Math.floor(Math.random(0, 0.8) * heightMap);
		}
	}

	timer++;

	if (timer % 12 == 0){
		bullets = 0;
	}

	for (i = 0; i < bullet.length; i++){
		for (j = 0; j < enemies.length; j++){
			if ((bullet[i].x > enemies[j].x) && (bullet[i].x < enemies[j].x + enemies[j].pW) && (bullet[i].y > enemies[j].y) && (bullet[i].y < enemies[j].y + enemies[j].pH)){
				enemies[j].x = Math.floor(Math.random() * widthMap) + widthMap;
				enemies[j].y = Math.floor(Math.random(0, 0.7) * heightMap);
				score++;
			}
		}
	}

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 32:
				if (bullets <= 10){
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
}
