window.onload = init;

var map;
var ctxMap;

var rightBtn;
var leftBtn;
var upBtn;
var downBtn;

var moveX = 10;
var moveY = 10;

function init(){
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	leftBtn = document.getElementById("L");
	rightBtn = document.getElementById("R");
	upBtn = document.getElementById("U");
	downBtn = document.getElementById("D");

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
		}
	});
}

function clear(){
	ctxMap.fillStyle = "white";
	ctxMap.fillRect(0 , 0, 700, 400);
}

function goLeft(){
	clear();
	moveX -= 50; 
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 100, 100);
}

function goRight(){
	clear();
	moveX +=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 100, 100);
}

function goUp(){
	clear();
	moveY -=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 100, 100);
}

function goDown(){
	clear();
	moveY +=50;
	ctxMap.fillStyle = "black";
	ctxMap.fillRect(moveX, moveY, 100, 100);
}