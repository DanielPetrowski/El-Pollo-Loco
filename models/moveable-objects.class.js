class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false; 
 
  speedY = 0;
  acceleration = 2.5;

 
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  health = 100;
  lastHit = 0;

  

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    
    if (this instanceof ThrowableObject) {
      return true; 
    } else {
      return this.y < 147;
    }
  }

  
  isColliding(mo) {
   
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    ); 
  }

  hit() {
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime(); 
    }
  }

  isDead() {
    return this.health == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; 
    timePassed = timePassed / 1000; 
    return timePassed < 1; 
  }


  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
