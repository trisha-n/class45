var mario, marioimg, obstaclesimg, certificateimg, background1, backgroundImg, ground, passGroup, failGroup, gameState,resetimg

function preload() {
  marioimg = loadImage("images/run.png");
  obstaclesimg = loadImage("images/fail.png");
  certificateimg = loadImage("images/pass.png");
  backgroundImg = loadImage("images/background2.jpg");
  resetimg = loadImage("images/reset.png");
}
function setup() {
  createCanvas(1000,500);
  gameState = "play";
  background1 = createSprite(500,150,1000,500);
  background1.addImage("city",backgroundImg);
  background1.scale = 2
  mario = createSprite(200,450,10,10);
  mario.addImage("mario",marioimg);
  mario.scale = 0.5;
  //mario.debug = true;
  mario.setCollider("circle",0,0,100)
  ground = createSprite(500,450,1500,10);
  ground.shapeColor = "brown";
  ground.velocityX = -5;
  passGroup = new Group();
  failGroup = new Group();
  reset = createSprite(500,200,10,10);
  reset.addImage("restart",resetimg);
  reset.visible = false;
  reset.scale = 0.5
 }

function draw() {
 // background("white");
 if (gameState === "play"){
   reset,visible = false;
  if(ground.x < 300){
    ground.x = 500;
  }
  if(mario.y >= 395 && keyDown("SPACE")){
    mario.velocityY = -16; 
  }
 //console.log(mario.y);
 if(mario.isTouching(failGroup)){
   gameState = "end";
 }
  mario.velocityY = mario.velocityY + 0.8
  spawnObstacles();
  spwanpass();
 }else if(gameState === "end"){
    reset.visible = true;
    failGroup.setVelocityXEach(0);
    passGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    failGroup.setLifetimeEach(-1);
    passGroup.setLifetimeEach(-1);
 }
 
 mario.collide(ground);
  drawSprites();
 }
 function spawnObstacles(){
   var ran = Math.round(random(60,200))
   if(frameCount % ran === 0){
    var obstacle = createSprite(1000,400,10,10);
    obstacle.addImage("fail",obstaclesimg);
    obstacle.velocityX = -5;
    obstacle.scale = 0.1
    failGroup.add(obstacle);
    obstacle.lifetime = 200;
  }
}
 function spwanpass(){
   var ran = Math.round(random(60,200))
   if (frameCount % ran === 0){
     var certificate = createSprite(1000,300,10,10);
     certificate.addImage("pass",certificateimg);
     certificate.velocityX = -5;
     certificate.scale = 0.1;
     passGroup.add(certificate);
     certificate.lifetime = 200;

    
   }
 }