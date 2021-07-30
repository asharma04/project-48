var gunman
var pedestal
var wood1,wood2,wood3,wood4,wood5,wood6
//var bullet
var bulletGroup
var score = 0

var gameState = "wait"
var button
var button1

var pedestlepng
var gunmanpng1
var gunmanpng2
var bulletpng
var bulletpng1

function preload(){
  pedestlepng = loadImage("pedestle.png")
  gunmanpng1 = loadImage("gunman.png")
  gunmanpng2 = loadImage("gunman2.png")
  bulletpng = loadImage("bullet.png")
  bulletpng1 = loadImage("bullet-removebg-preview.png")
}
function setup() {
  createCanvas(800,600);
 pedestal = createSprite(400,300,50,450);
  pedestal.addImage(pedestlepng)
  pedestal.setCollider("rectangle",0,0,50,450)
  //pedestal.debug = "true"
  
 gunman = createSprite(430, 200, 50, 50);
 gunman.addImage(gunmanpng1)
 gunman.scale = .75
 gunman.shapeColor = "red"

 wood1 = createSprite(-75,130,500,50)
 //wood1.velocityX = .25
 wood2 = createSprite(-175,330,500,50)
 //wood2.velocityX = .5
 wood3 = createSprite(-110,480,500,50)
 //wood3.velocityX = .75
 wood4 = createSprite(860,150,500,50)
 //wood4.velocityX = -.25
 wood5 = createSprite(900,270,500,50)
// wood5.velocityX = -.5
 wood6 = createSprite(890,400,500,50)
 //wood6.velocityX = -.75

 //bullet = createSprite(400,300,10,10)
 //bullet.visible = false

 bulletGroup = createGroup()

 button = createButton("play")
 button1 = createButton("restart")
  button1.hide()
 

}

function draw() {
  background("skyblue");  
  textSize(20)
  text("score = "+score,600,30)


  if(gameState === "wait"){
    button.show()
    button.mousePressed(()=>{
      wood1.velocityX = .25
    wood2.velocityX = .5
    wood3.velocityX = .75
    wood4.velocityX = -.25
    wood5.velocityX = -.5
    wood6.velocityX = -.75
      gameState = "play"
    })
  }
  if(gameState === "play"){
    button.hide()
  score = score+Math.round(frameRate()/60)


  //to move gunman up and down
  if(keyDown("up")){
    if(gunman.y<=75)
      gunman.y = 75
    else
      gunman.y = gunman.y-3

  }

  if(keyDown("down")){

    if(gunman.y>=525)
      gunman.y = 525
    else
      gunman.y = gunman.y+3
  }

  if(keyDown("left")){
    gunman.x = 375
    gunman.addImage(gunmanpng2)
    gunman.scale = .75

    createBullet()
    bullet.x = 280
    bullet.addImage(bulletpng)
    bullet.scale = .05
    
    bullet.velocityX = -5
  }

  if(keyDown("right")){
    gunman.x = 430
    gunman.addImage(gunmanpng1)
    gunman.scale = .75

    createBullet()
    bullet.x = 520
    bullet.addImage(bulletpng1)
    bullet.scale = .05
    bullet.velocityX = 5
  }


  var rand = random(1,6)
  switch(rand){
    case 1: wood1.x += 2
    break 
    case 2: wood2.x += 2
    break
    case 3: wood3.x += 2
    break
    case 4: wood4.x -= 2
    break
    case 5: wood5.x -= 2
    break
    case 6: wood6.x -= 2
    break

  }

  if(wood1.isTouching(pedestal) ||
  wood2.isTouching(pedestal) ||
  wood3.isTouching(pedestal) ||
  wood4.isTouching(pedestal) ||
  wood5.isTouching(pedestal) ||
  wood6.isTouching(pedestal)){
    gameState ="end"
   
  }

  if(bulletGroup.isTouching(wood1)){
    wood1.x -= 25
    bulletGroup[0].destroy()
  }
  if(bulletGroup.isTouching(wood2)){
    wood2.x -= 25
    bulletGroup[0].destroy()
  }
  if(bulletGroup.isTouching(wood3)){
    wood3.x -= 25
    bulletGroup[0].destroy()
  }
  if(bulletGroup.isTouching(wood4)){
    wood4.x += 25
    bulletGroup[0].destroy()
  }
  if(bulletGroup.isTouching(wood5)){
    wood5.x += 25
    bulletGroup[0].destroy()
  }
  if(bulletGroup.isTouching(wood6)){
    wood6.x += 25
    bulletGroup[0].destroy()
  }
  }

  if(gameState === "end"){
    textSize(40)
    fill("red")
    text("Game Over!!!",300,50)

    wood1.velocityX = 0
    wood2.velocityX = 0
    wood3.velocityX = 0
    wood4.velocityX = 0
    wood5.velocityX = 0
    wood6.velocityX = 0

    button1.show()
    button1.mousePressed(()=>{
      button1.hide()
      score = 0
      gunman.y = 200
      wood1.x = -75
      wood2.x = -175
      wood3.x = -110
      wood4.x = 860
      wood5.x = 900
      wood6.x = 890

      gameState = "wait"
    })
  }

  drawSprites();
}

 function createBullet(){
   bullet = createSprite(400,300,10,10)
   

   bullet.y = gunman.y-65
   bullet.lifetime = 300
   bulletGroup.add(bullet)
 }