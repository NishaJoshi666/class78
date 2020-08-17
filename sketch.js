var ball,ballimage;
var paddle,paddleimage;

function preload() {
 
  ballimg = loadImage("ball.png");
  
  paddleimg = loadImage("paddle.png");

}
function setup() {
  createCanvas(400, 400);
  
  ball = createSprite(200,200,20,20);
  ball.addImage("ball",ballimg);
  paddle = createSprite(330,330,30,10);
  paddle.addImage("paddle",paddleimg);

  ball.velocityX = 9; 

}

function draw() {
  background(205,153,0);
  createEdgeSprites();

  
  ball.bounceOff(paddle);  
 
  /* Prevent the paddle from going out of the edges */ 
  
  
  if(keyDown(UP_ARROW))
  {
     paddle.velocityY = -10;
  }
  
  if(keyDown(DOWN_ARROW))
  {
   paddle.velocityY = 10;
  }
  randomVelocity();
  drawSprites();
  
}

function randomVelocity()
{
 edges = createEdgeSprites();
 //bounceOff the left Edge only
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[2],edges[4]);  
  paddle.bounceOff(edges);
}

