window.onload = init;
var score = 0, timer = 20;
var timerDiv, scoreDiv;
var canvas, context;
var isCursor = false;
var newKey = 0;
var rectangle = {
	x: 50,
	y: 50,
	pW: 20,
	pH: 20,
	color: "red",
	key: 82
}

function init(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext('2d');
	scoreDiv = document.getElementById("valueScore");
	timerDiv = document.getElementById("valueTimer");
	canvas.addEventListener("mousemove", setMousePosition, false);
	addEventListener("keydown", function(event){
		newKey = event.keyCode;
	});
	addEventListener("mouseover", function(event){
		if (newKey == rectangle.key && event.clientX > rectangle.x && event.clientX < rectangle.x + rectangle.pW && event.clientY > rectangle.y && event.clientY < rectangle.y + rectangle.pH){
			rectangle.x = Math.floor(Math.random() * 230);
			rectangle.y = Math.floor(Math.random() * 100);
			switchSetting();
			score++;
		}
	});
}

var canvasPos = getPosition(canvas);
var mouseX = 0;
var mouseY = 0;

function setMousePosition(e) {
	mouseX = e.clientX - canvasPos.x;
 	mouseY = e.clientY - canvasPos.y;
}

function update() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	scoreDiv.innerHTML = score;
	
  	context.beginPath();
  	context.rect(rectangle.x, rectangle.y, rectangle.pW, rectangle.pH);
  	context.fillStyle = rectangle.color;
  	context.fill();
  	requestAnimationFrame(update);
}

function getPosition(el) {
  	var xPosition = 0;
  	var yPosition = 0;

  	while (el) {
    	xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
   		yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    	el = el.offsetParent;
  	}
  	return {
    	x: xPosition,
   	 	y: yPosition
  	};
}

function switchSetting(){
	var arr = [{color: "red", key: 82}, {color: "blue", key: 66}, {color: "green", key: 71}];
	switch(Math.floor(Math.random() * 10)){
		case 1:
		case 2:
		case 3:
			rectangle.color = arr[0].color;
			rectangle.key = arr[0].key;
			break;
		case 4:
		case 5:
		case 6:
			rectangle.color = arr[1].color;
			rectangle.key = arr[1].key;
			break;
		case 7:
		case 8:
		case 9:
			rectangle.color = arr[2].color;
			rectangle.key = arr[2].key;
			break;
	}
}

function tick(){
	timer--;
	timerDiv.innerHTML = timer;
	if (timer == 0) {
		alert(score);
		score = 0;
		timer = 20;
	}
}

function start(){
	document.getElementById("canvas").style.display = "block";
	document.getElementById("rule").style.display = "none";
	update();
	setInterval(tick, 1000);
}
