window.onload = init;

var ctxMap, map, widthMap = 1200, heightMap = 600;
var imageOpponent = new Image();
imageOpponent.src = "https://cdn2.scratch.mit.edu/get_image/gallery/4958835_170x100.png";
var tiles1 = new Image();
tiles1.src = "https://cdn.pixilart.com/images/user/profile/large/994be0eabaf92dd.png?v=1541655203";
var fireball = new Image();
fireball.src = "https://i.ya-webdesign.com/images/fire-ball-png-4.png";
var fireRain = new Image();
fireRain.src = "https://www.pngkey.com/png/full/792-7929722_fire-royalty-free-ball-clip-art-cool-red.png";
var isPlaying;

var bullet = [];
var enemies = [];
var bullets = 0, timer = 0;
var weapon = 1;

var i, j;

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init(){
	document.getElementById("help").style.display = "none";

	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width = widthMap;
	map.height = heightMap;

	getScore(0);
	document.form.level.value = player.level;
	document.form.weapon.value = "Fireball";
	startLoop();

	spawnOpponent(6);

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 87:
				player.y -= 20;
				break;
			case 83:
				player.y += 20;
				break;
			case 68:
				player.x += 20;
				break;
			case 65:
				player.x -= 20;
				break;
			case 49:
				weapon = 1;
				document.form.weapon.value = "Fireball";
				break;
			case 50:
				weapon = 2;
				document.form.weapon.value = "Rage";
				break;
			case 51:
				weapon = 3;
				document.form.weapon.value = "Rain";
				break;
		}
	});
}

function help(){
	if (document.getElementById("help").style.display == "block"){
		document.getElementById("help").style.display = "none";
	}else{
		document.getElementById("help").style.display = "block";
	}
}

function getScore(record){
	document.form.score1.value = record;
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
	level: 1,
	x: 100,
	y: 100,
	pW: 150,
	pH: 150,
	draw: function(){
		ctxMap.drawImage(tiles1, 0, 0, 250, 250, this.x, this.y, this.pW, this.pH);
	}

}

var drawBullet = {
	drawLine: function(){
		ctxMap.drawImage(fireball, 0, 0, 1156, 808, bullet[i].x, bullet[i].y, 60, 30);
	},
	drawDown: function(){
		ctxMap.drawImage(fireRain, 0, 0, 650, 893, bullet[i].x, bullet[i].y, 50, 50);
	}
}



var drawEnemies = {
	draw: function(){
		ctxMap.drawImage(imageOpponent, 0, 0, 100, 100, enemies[i].x, enemies[i].y, 120, 120);
	} 
}

function levelPlayer(score){
	if (player.level == 1){
		if (score == 5) {player.level++; document.form.level.value = player.level;}
	}
	if ((player.level > 1) && (player.level <= 6)){
		if (score % 15 == 0) {player.level++; document.form.level.value = player.level;}
	} 
	if (player.level > 6){
		if (score % 10 == 0) {player.level++; document.form.level.value = player.level;}
	} 
}

var score = 0;

function draw(){
	ctxMap.clearRect(0, 0, widthMap, heightMap);
	if (weapon == 3){
		for (i = 0; i < bullet.length; i++){
			bullet[i].y += 5;
			drawBullet.drawDown();
			if (bullet[i].y > heightMap) bullet.splice(i, 1);
		}
	}
	if (weapon != 3){
		for (i = 0; i < bullet.length; i++){
			bullet[i].x += bullet[i].vx;
			drawBullet.drawLine();
			if (bullet[i].x > widthMap) bullet.splice(i, 1);
		}
	}
	
	for (i = 0; i < enemies.length; i++){
		enemies[i].x -= (player.level * 1);
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
				enemies[j].y = Math.floor(Math.random(0, 0.8) * heightMap);

				score++;
				getScore(score);
				levelPlayer(score);
			}
		}
	}

	

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 32:
				if (bullets <= 10){
					switch (weapon){
						case 1:
							for (i = 0; i < 3; i++){
								bullet.push({
									x: player.x + player.pW/2,
									y: player.y + player.pH/2 - 45,
									vx: 10,
									vy: 0,
								});
							}
							break;
						case 2:
							for (i = 0; i < 3; i++){
								bullet.push({
									x: player.x + player.pW/2,
									y: player.y + player.pH/2 - (i * 38),
									vx: 10,
									vy: 0,
								});
							}
							break;
						case 3:
							for (i = 0; i < 10; i++){
								bullet.push({
									x: Math.floor(Math.random() * widthMap),
									y: Math.floor(Math.random() * heightMap) - heightMap,
									vx: 10,
									vy: 2,
								});
							}
							break;
					}
				bullets += 1;
				}
				break;
		}
	});

	player.draw();
}
