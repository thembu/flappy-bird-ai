let TOTAL = 200 ;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let generation = 1;
let pipeImg;

let birdSprite;



function preload() {
  birdSprite = loadImage('sprites/mordecai-removebg-preview.png');
  pipeImg = loadImage('sprites/pole-removebg-preview.png');
}


function setup() {
  
  createCanvas(800, 600);
  slider = createSlider(1, 100, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
  bg = loadImage('sprites/background.jpg');
  

}

function draw() {
  background(bg);

  textSize(32);
  text("Generation: " + generation, 10, 30);
  for (let n = 0; n < slider.value(); n++) {

  if (frameCount % 75 == 0) {

    pipes.push(new Pipe());

  }

  counter++;



  for (let i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
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


  for (let i = birds.length-1; i >= 0; i--) {
    if (birds[i].offScreen()) {
      savedBirds.push(birds.splice(i, 1)[0]);
    }
  }


  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show()
  }

  if(birds.length === 0) {
    counter = 0; 
    nextGeneration();
    pipes = [];

  }
}
  



// Display the input and output values


    


}







