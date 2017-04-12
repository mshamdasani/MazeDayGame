var canvas = document.getElementById("layer2");
var context;

var canv = document.getElementById('map');

var ctx = canv.getContext('2d');
ctx.scale(2,2);

var gx = 405;
var gy = 100;
var gmy = 4;
var ddx = 205;
var ddy = 205;
var action = false;
var ddmvx = 0;
var intrvlID = 0;
var pan = 0.0;
var pI = 0.1;
var steps = new Howl({
		src: ['footsteps2.mp3'],
		html5: true,
		loop: true,
		volume: 1.0, 
		sprite: {
			walk: [0,6000]
		}
	});

function init(){
	context = canvas.getContext("2d");
	map();
	intrvlID = setInterval(draw,100);
}
function dareD(){
	context.beginPath();
	context.rect(ddx,ddy,30,30);
	context.fillStyle = 'blue';
	context.fill();
	context.closePath();
}
function guard(x,y){
	context.beginPath();
	context.rect(x,y,40,40);
	context.fillStyle = 'red';
	context.fill();
	context.closePath();
}
function map(){
  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.lineTo(200,100);
  ctx.lineTo(200,50);
  ctx.lineTo(400,50);
  ctx.lineTo(400,100);
  ctx.lineTo(500,100);
  ctx.lineTo(500,50);
  ctx.fillStyle= "white";
  ctx.fillRect(200, 50, 200, 150);
  ctx.fillStyle = "green";
  ctx.fillRect(100, 100, 100, 50);
  ctx.fillRect(400, 100, 100, 50);
  ctx.fillRect(500, 50, 50, 100);

  ctx.moveTo(100,150);
  ctx.lineTo(200,150);
  ctx.lineTo(200,200);
  ctx.lineTo(400,200);
  ctx.lineTo(400,150);
  ctx.lineTo(550,150);
  ctx.lineTo(550,50); 
  ctx.lineTo(500,50);

  ctx.moveTo(100,100);
  ctx.lineTo(100,150);

  ctx.stroke();
  ctx.closePath();
   
}
function onKeyDown(e){
	if (e.keyCode ==32){
		action = true;
	}
}
function onKeyUp(e){
	if (e.keyCode == 32) {
		action = false;
	}
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function clear(){
	context.clearRect(0,0,canvas.width,canvas.height);
}
function footsteps(){
	
}

function draw(){
	clear();
	guard(gx,gy);
	dareD();
	if (action){
		if(gy < 100 || gy > 150){
			ddmvx = 20;
		}else{
			clearInterval(intrvlID);
			alert('Game Over. The guard spotted you');
			steps.stop();
		}	
	}
	if(gy + gmy > 400 || gy + gmy < 100){
		gmy = -gmy;
		pI = -pI;
	}
	if(ddx + ddmvx > 1200){
		clearInterval(intrvlID);
		steps.stop();
	}
	pan += pI;
	steps.stereo(-1.0,id);
	ddx += ddmvx;
	gy += gmy;
}
var id = steps.play('walk');
init();


