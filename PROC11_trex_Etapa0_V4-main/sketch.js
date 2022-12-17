
var END=0;
var PLAY=1;
var gameState=PLAY;
var trex ,trex_running, trex_collided;
var edges
var piso, pisoImg, invisible;
var nubeImg, nubes;
var obstaculo1Img, obstaculo2Img, obstaculo3Img, obstaculo4Img, obstaculo5Img, obstaculo6Img;
var groupnubes ,groupobstaculos
var gameOver, restart, gameoverImg, restartImg;
var die, checkpoint, jump;


function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");  
trex_collided=loadAnimation("trex_collided.png");
pisoImg=loadImage("ground2.png");
nubeImg=loadImage("cloud.png")
obstaculo1Img=loadImage("obstacle1.png")
obstaculo2Img=loadImage("obstacle2.png")
obstaculo3Img=loadImage("obstacle3.png")
obstaculo4Img=loadImage("obstacle4.png")
obstaculo5Img=loadImage("obstacle5.png")
obstaculo6Img=loadImage("obstacle6.png")
gameOverImg=loadImage("gameOver.png"); 
restartImg=loadImage("restart.png")
die=loadSound("die.mp3");
checkpoint=loadSound("checkpoint.mp3");
jump=loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //crear sprite de Trex
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_collided);
 trex.scale=0.6;


 //piso
piso= createSprite(180,180,600,20);
piso.addImage(pisoImg);
invisible=createSprite(200,190,600,10)
invisible.visible=false;

//sprites de fin del juego
gameOver= createSprite(200,50); 
gameOver.addImage(gameOverImg);
gameOver.scale=0.7
gameOver.visible=false;

restart= createSprite(280,100); 
restart.addImage(restartImg); 
restart.scale=0.5;
restart.visible=false;


groupnubes=createGroup();
groupobstaculos=createGroup();

 edges=createEdgeSprites();
}

function draw(){
  background("lightgray")

if(gameState === PLAY){
 //velocidad del piso 
 piso.velocityX=-2;

 //regeneracion del piso 
 if(piso.x < 0){
  piso.x=piso.width/2;
  }

  if(keyDown("space")&& trex.y>=100){
    trex.velocityY=-10;
   jump.play();
  }

  trex.velocityY=trex.velocityY+0.8
  trex.collide(invisible);

  crearnNubes();
  crearObstaculos();

if(groupobstaculos.isTouching(trex)){
die.play();
  gameState=END;
}  

}else if (gameState === END){
  //mostrar fin del juego
gameOver.visible=true;
restart.visible=true;

//velocidad del piso
piso.velocityX=0;

//velocidad de trex
trex.velocityY=0;

//velocidad obstaculos y nubes
groupnubes.setVelocityXEach(0);
groupobstaculos.setVelocityXEach(0);

//tiempo de vida
groupnubes.setLifetimeEach(-1);
groupobstaculos.setLifetimeEach(-1);

//cambiar animacion
trex.changeAnimation("collided");


}

    



  
  

  
drawSprites();
}

//funcion de nubes
function crearnNubes(){
  if (frameCount % 50 === 0){
    var nube = createSprite(600,100,30,10);
    nube.addImage(nubeImg)
    nube.scale=0.5;
    nube.y=Math.round(random(10,100))
    nube.velocityX=-3;
    nube.depth=trex.depth;
    trex.depth=trex.depth+3;
    nube.lifetime=250;
    groupnubes.add(nube)
  }
  
}
//funcion de obstaculos
function crearObstaculos(){
if (frameCount % 60 === 0){
var obstaculo = createSprite(600,160,30,10);
//obstaculo.addImage(obstaculo1Img)
var numeros = Math.round(random(1,6));
switch(numeros){
  case 1:obstaculo.addImage(obstaculo1Img);break
  case 2:obstaculo.addImage(obstaculo2Img);break
  case 3:obstaculo.addImage(obstaculo3Img);break
  case 4:obstaculo.addImage(obstaculo4Img);break
  case 5:obstaculo.addImage(obstaculo5Img);break
  case 6:obstaculo.addImage(obstaculo6Img);break
}
obstaculo.scale=0.5;
obstaculo.velocityX=-3;
obstaculo.lifetime=250;
groupobstaculos.add(obstaculo)
}
}