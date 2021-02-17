const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

gameState="intro";
var hut;
var mongoose;
var snake_pit;
var count=0;
var monImg , snakeImg , babyImg , stoneImg;
var introImg , backgroundImg;
var edges;
var score = 0;
var barrier;

function preload() 
{
    introImg=loadImage("myProject/intro.jpg");
    monImg = loadImage("myProject/mongoose.gif");
    snakeImg = loadImage("myProject/snake.gif");
    babyImg = loadImage("myProject/baby.jpg");
    backgroundImg = loadImage("myProject/background.jpg");
    ding = loadSound("myProject/ding.mp3");
    stoneImg = loadImage("myProject/stone.png");

    
    
}

function setup()
{
    var canvas = createCanvas(1500,750);
    engine = Engine.create();
    world = engine.world;

    rectMode(CENTER);
    hut= createSprite(1100,350,270,200);
    hut.visible = false; 

    barrier = createSprite( 550, 350, 20 ,750);
    barrier.visible = false;

    barrier2 = createSprite( 750, 400, 1500 ,20);
    barrier2.visible = false;

    mongoose = createSprite(700,500,20,20);
    mongoose.addImage(monImg);
    mongoose.scale = 0.2;
    mongoose.debug = false;
    mongoose.setCollider("rectangle" , 0,0,300,120)

   
   
    snakeGroup = new Group();
   
}

function draw()
{
    //background(backgroundImg);
    //introduction
  // if(mongoose.x<1300 )
   // {
       
    //}
    

    if(gameState==="intro")
    {
        background("black")
        // background(introImg);
        textSize(25);
        fill("pink");
        text("PROTECT THE CHILD", width/2-100,50);

        textSize(20);
        fill("pink");
        text("You and your mother were walking down the forest in search for some food .but suddenly a pack of wolves appear." +"\n "+ "" +"\n" +"and manage to kill your mother. After fending for yourself for 5 days,"  +"\n "+"" +"\n "+" a lumberjack appears, juding you by your innocent appearence he decides to adopt you as a pet and gaurdian" +"\n "+"" +"\n" +" to his single child he tests your loyalty and innocence by giving you a task ." +"\n "+ ""+"\n" +"he left his child at his hut and kept you incharge for its safety as the place where he lives is not safe"  +"\n "+" " +"\n" +" you have to protect the baby by pressing the arrow keys to touch and kill the snakes if the snakes enter the hut they will kill the baby,"  +"\n "+"" +"\n "+ "And you will lose your only family left as well as your life."  +"\n "+"" +"\n "+"Do not go too near the snake pit or all the snake will kill you and you will die. which will allow them to enter the hut and kill the baby."  +"\n "+ "" +"\n" + "You only have one chance.",100,150);
    
        if(keyDown("enter"))
        {
            gameState= "start";
        }
    }

    //Start State
    if(gameState=== "start")
    {  
        background(backgroundImg);
        noStroke();
        textSize(35)
        fill("green")
        text("kills : " + score, width-300, 50)
        
       // background(backgroundImg);
        
        if(snakeGroup.isTouching(hut))
        {
            count++;
          
        }

        if (keyDown("RIGHT_ARROW")) {
            mongoose.x+= 5;
            
          }
            
         if (keyDown("LEFT_ARROW")) {
            
            mongoose.x-= 5;
          } 
          
         if (keyDown("UP_ARROW")) {
            mongoose.y-= 5;
          }

         
         
         if (keyDown("DOWN_ARROW")) {
            mongoose.y+= 5;
          }

          if(score === 5)
         {
           gameState = "win";
       
         }
         

       
        spawnSnakes();

        snake_pit = createSprite(100,600,100,100);
        snake_pit.addImage(stoneImg);
        snake_pit.scale = 0.4;
        snake_pit.depth++; 

        if(mongoose.isTouching(snakeGroup))
        {
          snakeGroup.destroyEach();
          score++
          
          
        }

        if(score>0 && score%10=== 0 )
        {
            ding.play();
            score++
        }


        if(count===5)
        {
            gameState= "end";
        }

        if(snakeGroup.isTouching(barrier2))
        {
            snakeGroup.destroyEach();
        }

        mongoose.bounceOff(barrier);
        mongoose.bounceOff(barrier2);
        
        createEdgeSprites();
        
        drawSprites();
    }

    //End State
    if(gameState==="end")
    {
        background("red");
        textSize(40);
        text("GAME OVER",width/2,height/2);
        
    }

    
    if(gameState=== "win")
    {
        noStroke();
        textSize(50)
        
        fill("black")
        text("YOU HAVE PASSED THE TEST!" , width/2,height/2);
    }
}

function spawnSnakes()
{
    if(frameCount%80===0)
    {
        snake = createSprite(100,600,20,70);
        snake.debug = false;
        snake.setVelocity(random(3,8),-random(1,1));
        snakeGroup.add(snake);
        snake.addImage(snakeImg);
        snake.scale = 0.2;
    }

    



}