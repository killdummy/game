window.onload = init;
var score = 0, timer = 20, key = 0;
var timerDiv, scoreDiv, rectangle, gamearea, color = "red";
var onKey;

function init(){
	gamearea = document.getElementById("gamearea");
	scoreDiv = document.getElementById("valueScore");
	timerDiv = document.getElementById("valueTimer");
	rectangle = document.getElementById("rectangle");
	rectangle.style.top = "200px";
	rectangle.style.left = "500px";

	document.onkeydown = function(event){
		if (event.keyCode == 82 && onKey && color == "red"){
			switchSetting();
		}
		if (event.keyCode == 66 && onKey && color == "blue"){
			switchSetting();
		}
		if (event.keyCode == 71 && onKey && color == "green"){
			switchSetting();
		}
	}

}

function test1(){
	onKey = true;
}

function test2(){
	onKey = false;
}

function switchSetting(){
	score++;
	scoreDiv.innerHTML = score;
	var left, right, top, bottom;
	left = Math.floor(Math.random() * 800) + "px";
	right = Math.floor(Math.random() * 800) + "px";
	top = Math.floor(Math.random() * 400) + "px";
	bottom = Math.floor(Math.random() * 400) + "px";
	var arr = [{color: "red", key: 82}, {color: "blue", key: 66}, {color: "green", key: 71}];
	switch(Math.floor(Math.random() * 9)){
		case 0:
		case 1:
		case 2:
			color = "red";
			rectangle.style.bottom = bottom;
			rectangle.style.top = top;
			rectangle.style.right = right;
			rectangle.style.left = left;
			rectangle.style.backgroundColor = arr[0].color;
			key = arr[0].key;
			break;
		case 3:
		case 4:
		case 5:
			color = "blue";
			rectangle.style.bottom = bottom;
			rectangle.style.top = top;
			rectangle.style.right = right;
			rectangle.style.left = left;
			rectangle.style.backgroundColor = arr[1].color;
			key = arr[1].key;
			break;
		case 6:
		case 7:
		case 8:
			color = "green";
			rectangle.style.bottom = bottom;
			rectangle.style.top = top;
			rectangle.style.right = right;
			rectangle.style.left = left;
			rectangle.style.backgroundColor = arr[2].color;
			key = arr[2].key;
			break;
	}
}

function tick(){
	timer--;
	timerDiv.innerHTML = timer;
	if (timer == 0) {
		alert("Количество очков " + score);
		score = 0;
		timer = 20;
		scoreDiv.innerHTML = score;
	}
}

function start(){
	document.getElementById("gamearea").style.display = "block";
	document.getElementById("rule").style.display = "none";
	setInterval(tick, 1000);
}

function onOver(){

}
