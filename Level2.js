var canvas = document.getElementById("layer2");
var context;
var canv = document.getElementById('map');
var ctx = canv.getContext('2d');
ctx.scale(2,1);
var gx = 875; //610
var gy = 300;
var g2x = 415; //590
var g2y = 200;
var g2mx = 10;
var g2my = 4;
var gmx= 10;
var gmy = 4;
var ddx = 640;
var ddy = 569;
var action = false;
var ddmvx = 0;
var ddmyx = 0;
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
	context.rect(ddx,ddy,25,25);
	context.fillStyle = 'blue';
	context.fill();
	context.closePath();
}
function guard(x,y){
	context.beginPath();
	context.rect(x,y,25,25);
	context.fillStyle = 'red';
	context.fill();
	context.closePath();
}

function guard2(x,y){ //guard2 is a circle
	context.beginPath();
	var radius = 15;
	context.arc(x,y, radius, 0, 2*Math.PI, false);
	context.fillStyle = 'red';
	context.fill();
	context.closePath();
}
function map(){
  ctx.beginPath();
  ctx.moveTo(150,200);
  ctx.lineTo(200,200);
  ctx.lineTo(200,50);
  ctx.lineTo(450,50); //400
  ctx.lineTo(450, 450); //200
  //ctx.lineTo(500,200); //450
  
  //Safe Space on Right
  //ctx.lineTo(500,150); 
  //ctx.lineTo(550, 150);
  //ctx.lineTo(550, 350);
  //ctx.lineTo(500,350);
  //ctx.lineTo(500,300);
  //ctx.lineTo(450,300);

  //Chancellor Office on Left
  ctx.moveTo(150,200);
  ctx.lineTo(150, 150);
  ctx.lineTo(75,150); //100
  ctx.lineTo(75, 350); //100
  ctx.lineTo(150, 350);
  ctx.lineTo(150, 300)

  ctx.moveTo(150,300); //Bottom of main block
  ctx.lineTo(200,300);
  ctx.lineTo(200,450);
  ctx.lineTo(300, 450);
  ctx.lineTo(300, 600);
  ctx.lineTo(310, 600);

  ctx.moveTo(340, 600);
  ctx.lineTo(350, 600);
  ctx.lineTo(350, 450);
  ctx.lineTo(450, 450);
  //ctx.lineTo(450,450); //400
  //ctx.lineTo(450,300); //400
	
  ctx.fillStyle= "white";
  ctx.fillRect(200, 50, 250, 400);//main block
  ctx.fillRect(150,200, 50, 100); //path to chancellor
  ctx.fillRect(300, 450, 50, 100);
  //ctx.fillRect(450, 200, 50, 100);//path to safe space

  ctx.fillStyle = "green";
  ctx.fillRect(75, 150, 75, 200);
  ctx.fillRect(300, 450, 50, 150);
  //ctx.fillRect(500, 150, 50, 200);
  //ctx.fillRect(500, 220, 60, 60);

  ctx.moveTo(310, 600);
  ctx.lineTo(315, 650);
  ctx.lineTo(345, 650);
  ctx.lineTo(340, 600);
  ctx.moveTo(341, 610);
  ctx.lineTo(311, 610);
  ctx.moveTo(342, 620);
  ctx.lineTo(312, 620);
  ctx.moveTo(343, 630);
  ctx.lineTo(313, 630);
  ctx.moveTo(344, 640);
  ctx.lineTo(314, 640);

  /*ctx.moveTo(525,280);
  ctx.lineTo(530,280); //stairs setup
  ctx.lineTo(530,220);
  ctx.moveTo(535,220);
  ctx.lineTo(535,280);
  ctx.moveTo(540,220);
  ctx.lineTo(540, 280);
  ctx.moveTo(545, 220);
  ctx.lineTo(545, 280);
  ctx.moveTo(550, 220);
  ctx.lineTo(550, 280); //525
  ctx.moveTo(555, 220);
  ctx.lineTo(555, 280);
  ctx.moveTo(560, 220);
  ctx.lineTo(560, 280);
  ctx.lineTo(525,280);
  ctx.moveTo(560, 220); //525
  ctx.lineTo(525,220);*/



  ctx.stroke();
  ctx.closePath();  
}

function onKeyDown(e){
	if (e.keyCode == 32){
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
	guard2(g2x, g2y);
	dareD();
	context.font="15px Times New Roman";
	context.strokeText("Chancellor's Office", 169, 230);
	if (action && ddy == 569){
		//play a sound when dareD actually starts moving
		if(gy < 450 || g2x > 415){
			ddmyx = -10;
			//ddmyx = -10;
		}else{
			clearInterval(intrvlID);
			alert('Game Over. The guard spotted you');
			steps.stop();
		}	
	} else if (action && ddx < 150){
		//play a sound when dareD actually starts moving
		ddmyx = -20;
	}
	if( gx + gmx < 410 || gx + gmx > 870){
		gmx = gmx * -1;
	}

	if (g2x + g2mx > 870 || g2x + g2mx < 410){
		g2mx = g2mx * -1;
	}

	if(ddy + ddmyx <235){
		ddmyx = 0;
	}
	else if (action && ddy == 235){
		ddmvx= -10;
	}
	if(ddx+ddmvx <= 160) {
		//clearInterval(intrvlID);
		ddmvx = 0;
		//steps.stop();
	}

	pan += pI;
	steps.stereo(-1.0,id);
	ddx += ddmvx;
	ddy += ddmyx;
	//gy += gmy;
	//g2y += g2my;
	gx+=gmx;
	g2x += g2mx
}
var id = steps.play('walk');
init();


