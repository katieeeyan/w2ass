// Week 2 – Bouncing Colors
// Started from the class Bouncing Ball example.
// Added: the ball changes color and size every time it hits a wall,
// a second shape (a square) bouncing at a different speed,
// and a key press to pause the animation.

// global variables for the ball
let x, y, d;
let xDir, yDir;
let r, g, b;

// global variables for the square
let sqX, sqY, sqSize;
let sqXDir, sqYDir;

// how many times anything hit a wall
let bounces;

// true = moving, false = paused
let isMoving;

function setup() {
  createCanvas(windowWidth, windowHeight);

  x = width / 2;
  y = height / 2;
  d = 50;
  xDir = 3;
  yDir = -2;

  // starting color for the ball
  r = 255;
  g = 80;
  b = 120;

  sqX = 100;
  sqY = 100;
  sqSize = 40;
  sqXDir = -2;
  sqYDir = 4;

  bounces = 0;
  isMoving = true;
}

function draw() {
  // low alpha leaves a trail
  background(10, 10, 30, 20);

  // ----- ball -----
  noStroke();
  fill(r, g, b);
  circle(x, y, d);

  // ----- square -----
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(sqX, sqY, sqSize, sqSize);

  // only move if not paused
  if (isMoving == true) {
    x += xDir;
    y += yDir;
    sqX += sqXDir;
    sqY += sqYDir;
    checkWalls();
  }

  // the ball grows a little with every bounce, then resets when it gets too big
  if (d > 200) {
    d = 50;
  }

  // text changes depending on the state
  noStroke();
  fill(255);
  textSize(16);
  if (isMoving) {
    text("bounces: " + bounces + "   (press any key to pause)", 20, 30);
  } else {
    text("paused - press any key to keep going", 20, 30);
  }
}

// checks every edge and bounces the shapes back
function checkWalls() {
  // ball hits left or right wall
  // (only flip if it's moving toward that wall, so a bigger ball doesn't get stuck)
  if ((x > width - d / 2 && xDir > 0) || (x < d / 2 && xDir < 0)) {
    xDir = -xDir;
    newBallColor();
  }
  // ball hits top or bottom wall
  if ((y > height - d / 2 && yDir > 0) || (y < d / 2 && yDir < 0)) {
    yDir = -yDir;
    newBallColor();
  }

  // square hits a wall (its pivot is the top-left corner)
  if (sqX > width - sqSize || sqX < 0) {
    sqXDir *= -1;
    bounces++;
  }
  if (sqY > height - sqSize || sqY < 0) {
    sqYDir *= -1;
    bounces++;
  }
}

// gives the ball a new random color and makes it a bit bigger
function newBallColor() {
  r = random(100, 255);
  g = random(0, 255);
  b = random(100, 255);
  d += 5;
  bounces++;
}

function keyPressed() {
  // flip true/false
  isMoving = !isMoving;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
