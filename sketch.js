// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

let bird;
let pipes = [];


function setup() {
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);


  for (let i = pipes.length-1; i >= 0; i--) {
   pipes[i].show();
    pipes[i].update();

    if(pipes[i].hit(bird)) {
      console.log("HIT");
    } 

    if(pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    
  }

  bird.think(pipes);
  bird.update();
  bird.show();


  if (frameCount % 120 == 0) {

    pipes.push(new Pipe());

  }

  
    
  


}


function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

