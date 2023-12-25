let TOTAL = 350 ;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;

function setup() {
  
  createCanvas(800, 600);

  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }

}

function draw() {
  background(0);

  if (frameCount % 75 == 0) {

    pipes.push(new Pipe());

  }

  counter++;



  for (let i = pipes.length-1; i >= 0; i--) {
    pipes[i].update();
    
    for (let j = birds.length-1; j >= 0; j--) {
      if (pipes[i].hit(birds[j])) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }


    // if(pipes[i].hit(bird)) {
    //   console.log("HIT");
    // } 

    if(pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
  }

  if(birds.length === 0) {
    counter = 0; 
    nextGeneration();
    pipes = [];

  }
  

  for (let bird of birds) {
    bird.show();
  }

  for (let pipe of pipes) {
    pipe.show();
  }


    


}


