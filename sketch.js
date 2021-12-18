var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1, heart1img;
var heart2, heart2img;
var heart3, heart3img;
var zombie, zombieimg;
var bullets = 70;
var gameState = "fight";



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1img = loadImage("assets/heart_1.png")
  heart2img = loadImage("assets/heart_2.png")
  heart3img = loadImage("assets/heart_3.png")
  zombieimg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150, 40, 20, 20)
heart1.visible = true;
heart1.addImage("heart1",heart1img)
heart1.scale = 0.4;

heart2 = createSprite(displayWidth-100, 40, 20, 20)
heart2.visible = true
heart2.addImage("heart2", heart2img)
heart2.scale = 0.4;

heart3 = createSprite(displayWidth-150, 40, 20, 20)
heart3.visible = true
heart3.addImage("heart3", heart3img)
heart3.scale = 0.4;

zombieGroup = new Group()
bulletsGroup = new Group()

console.log(heart1.depth)
console.log(heart2.depth)
console.log(heart3.depth)
console.log(bg.depth)
}

function draw() {
  background(0); 

if(gameState === "fight"){
  
 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullets = createSprite(displayWidth-1150,player.y-30,20,10)
  bullets.velocityX = 20;
  bulletsGroup.add(bullets)
  player.depth = bullets.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to game state "bullet" when player runs out of bullets
if(bullets == 0){
  gameState = "Bullet"
}

//destroy the zombies when the bullet touches it
if(zombieGroup.isTouching(bulletsGroup)){
  for(var i= 0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletsGroup)){
      zombieGroup[i].destroy()
      bulletsGroup.destroyEach()

    }
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
  for(var i = 0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy
    }
  }
}
enemy();
}
drawSprites();

//destroy zombie and player and display a message in gamestate "lost"
if(gameState==="lost"){
  textSize(100)
  fill("red")
  text("You lost", 400, 400)
  zombieGroup.destroyEach()
  player.destroy()

} 

//destroy zombie and player and display a message in game state won
else if(gameState === "won"){
  textSize(100)
  fill("Yellow")
  test("You won", 400, 400)
  zombieGroup.destroyEach()
  player.destroy()
}

// destroy zombie, player and bullets and display a message in game state bullet
else if(gameState === "bullet"){
  textSize(50)
  fill("Yellow")
  test("You ran out of bullet", 470, 410)
  zombieGroup.destroyEach()
  player.destroy()
  bulletsGroup.destroyEach()
}
}

//making a function for zombie
function enemy(){
if(frameCount %50 === 0){
 zombie = createSprite(random(500,1100),random(100,500),40,40);
 zombie.addImage(zombieimg);
 zombie.scale = 0.15;
 zombie.velocityX = -3;
 zombie.debug = true;
 zombie.setCollider("rectangle", 0, 0, 400, 400)
 zombie.lifetime = 400;
 zombieGroup.add(zombie);


}

}
