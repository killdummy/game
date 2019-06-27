window.onload = init;

var map;
var ctxMap;

var rightBtn;
var leftBtn;
var upBtn;
var downBtn;

var moveX = 350, moveY = 200, moveS = moveX, step;

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	leftBtn = document.getElementById("L");
	rightBtn = document.getElementById("R");
	upBtn = document.getElementById("U");
	downBtn = document.getElementById("D");

	ctxMap.fillRect(moveX, moveY, 50, 50);

	console.log("D".charCodeAt(0));

	addEventListener("keydown", function(event){
		switch(event.keyCode){
			case 87:
				goUp();
				break;
			case 83:
				goDown();
				break;
			case 68:
				goRight();
				break;
			case 65:
				goLeft();
				break;
			case 32:
				shot();
				break;
		}
	});
}

function clear(){
	ctxMap.fillStyle = "white";
	switch(step){
		case 1:
			ctxMap.fillRect(moveX+50, moveY, 50, 50);
			break;
		case 2:
			ctxMap.fillRect(moveX-50, moveY, 50, 50);
			break;
		case 3:
			ctxMap.fillRect(moveX, moveY+50, 50, 50);
			break;
		case 4:
			ctxMap.fillRect(moveX, moveY-50, 50, 50);
			break;

	}
}

function goLeft(){
	moveX -= 50; 
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 50, 50);
	step = 1;
	clear();
	moveS = moveX;
}

function goRight(){
	moveX +=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 50, 50);
	step = 2;
	clear();
	moveS = moveX;
}

function goUp(){
	moveY -=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 50, 50);
	step = 3;
	clear();
	moveS = moveX;
}

function goDown(){
	moveY +=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 50, 50);
	step = 4;
	clear();
	moveS = moveX;
}

function clearShot(){
	ctxMap.fillStyle = "white";
	if (moveS-50 != moveX) ctxMap.fillRect(moveS-50, moveY+25, 10, 10);
}

function shot(){
	moveS += 50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveS, moveY+25, 10, 10);
	clearShot();
}
