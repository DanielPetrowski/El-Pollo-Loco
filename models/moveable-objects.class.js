class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable object should always fall
      
      return true;
      
    } else {
      return this.y < 180;
    }
  }

  isColliding(mo) {
    
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && //(warum +???) checken, ob rechte Seite des Characters > linke Seite Chicken // Offset --> "innerer roter Kasten in dem äußeren blauben"
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Character UNTEN > Chicken OBEN
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // Character LINKE Seite < Chicken RECHTE Seite
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    ); // Character OBEN < Chicken UNTEN
  }

  hit() {
    this.energy -= 5; // Reduce energy by 5 on hit
    if (this.energy < 0) {
      // Ensure energy doesn't go below 0
      this.energy = 0; // Set energy to 0 if it goes negative
    } else {
      // Only update lastHit if still alive
      this.lastHit = new Date().getTime(); // Record time of hit
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}
