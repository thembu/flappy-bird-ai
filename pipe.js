class Pipe {
  constructor() {
    this.spacing = 125;
    this.pipeSpacing = 300;
    this.top = random(height * 0.2, height * 0.8 - this.spacing);
    this.bottom = height - (this.top + this.spacing);

    this.x = width;
    this.w = 80;
    this.speed = 3;
    this.pipePassed = false;
  }

  hit() {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  show() {
    fill(255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  update() {
    this.x -= this.speed;
    
    // Check if the bird has passed this pipe
    if (!this.pipePassed && bird.x > this.x + this.w) {
      this.pipePassed = true;
    }
  }

  offscreen() {
    return this.x < -this.w;
  }
}
