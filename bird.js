// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */

class Bird {
    constructor(brain) {
      this.y = height / 2;
      this.x = 64;
  
      this.gravity = 0.6;
      this.lift = -10;
      this.velocity = 0;

  
      this.width = 64;
      this.height = 64;

      this.score = 0;
      this.fitness = 0;

      if(brain) {
          this.brain = brain.copy();
      } 
      
      else {

        this.brain = new NeuralNetwork(5, 8, 2);

      }

    }
  
    show() {
      // draw the icon CENTERED around the X and Y coords of the bird object
      fill(255, 50)
      stroke(255)
      ellipse(this.x, this.y, 32 , 32);
    }
  
    up() {
      this.velocity = this.lift;
    }
  


    mutate() {

      this.brain.mutate(0.1);

    }


    offscreen() {
         return (this.y > height || this.y < 0);
    }

    think(pipes) {
        let closest = null;
        let closestD = Infinity;


        if(pipes.length > 0) {
        for(let i = 0; i < pipes.length; i++) {
            let d = (pipes[i].x - pipes[i].w) - this.x
            if(d < closestD && d > 0) {
                closest = pipes[i];
                closestD = d;
            }
        }
      }

        
        if(closest) {

        let inputs = []

         inputs[0] = this.y/height;
         inputs[1] = closest.top/height;
         inputs[2] = closest.bottom/height;
         inputs[3] = closest.x/width;
         inputs[4] = this.velocity/10;

        let output = this.brain.predict(inputs);
        if(output[0] > output[1]) {
            this.up();
        }

    }

  }


    update() {
      this.score++;
      this.velocity += this.gravity;
      this.y += this.velocity;
  
    }
  }