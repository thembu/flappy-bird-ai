// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */

class Bird {
    constructor() {
      this.y = height / 2;
      this.x = 64;
  
      this.gravity = 0.6;
      this.lift = -10;
      this.velocity = 0;

      this.brain = new NeuralNetwork(4, 4, 1);
  
      this.width = 64;
      this.height = 64;
    }
  
    show() {
      // draw the icon CENTERED around the X and Y coords of the bird object
      fill(255)
      ellipse(this.x, this.y, 32 , 32);
    }
  
    up() {
      this.velocity = this.lift;
    }
  

    think(pipes) {
        let closest = null;
        let closestD = Infinity;

        for(let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x - this.x
            if(d < closestD) {
                closest = pipes[i];
                closestD = d;
            }
        }

        let inputs = []

         inputs[0] = this.y/height;
         inputs[1] = closest.top/height;
         inputs[2] = closest.bottom/height;
         inputs[3] = closest.x/width;
        let output = this.brain.predict(inputs);

        if(output > 0.5) {
            this.up();
        }

    }

    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
  
      if (this.y >= height - this.height / 2) {
        this.y = height - this.height / 2;
        this.velocity = 0;
      }
  
      if (this.y <= this.height / 2) {
        this.y = this.height / 2;
        this.velocity = 0;
      }
    }
  }