//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var Over,start;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  Over = loadImage("gameOver.png");
  start = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth-400, displayHeight-400);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);  
  trex.scale = 0.5;
  trex.velocityX=0;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(200,300);
  restart = createSprite(200,340);
  gameOver.addAnimation("gameOver",Over);
  gameOver.scale = 0.5;
  restart.addAnimation("restart",start);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(180);
  
  
  if (gameState === PLAY){
  
  ground.velocityX = -(6 + 3*score/100);
  camera.position.x = displayWidth/4;
  camera.position.y = trex.position.y;
    
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, displayHeight/2,50);
  
  if(keyDown("space")&& trex.position.y>140) {
    trex.velocityY = -23;
  }
  
  trex.velocityY = trex.velocityY + 1.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  trex.collide(invisibleGround);
  
  spawnClouds();
  spawnObstacles();
    
  if(obstaclesGroup.isTouching(trex)){
  // playSound("jump.mp3");
  gameState = END;
 //playSound("die.mp3");
    }
  
  }
  
  else if(gameState === END){
   
    Over.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collided",trex_collided);     
    
    //set lifetime of the game objects so that they are never     destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
    
  
  
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  }
  drawSprites();


  
}
  
  
  
  


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.position.x,ground.position.y-20 ,10,40);
    obstacle.velocityX = -7;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
  
  
}

function reset(){
  gameState = PLAY;
  
  Over.visible = false;
  start.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  count = 0;
  
}










