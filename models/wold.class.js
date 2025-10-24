class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0
  StatusBarHealth = new StatusBarHealth();
  StatusBarCoin = new StatusBarCoin();
  StatusBarBottle = new StatusBarBottle();
  StatusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld()
    this.run()
    this.totalCoins = this.level.coins.length
    this.totalBottles = this.level.bottles.length;
    this.endboss = this.level.enemies[this.level.enemies.length - 1]
  }
  "";
  setWorld() {
    this.character.world = this
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkEndbossHitByBottle();
      this.checkEnemyHitByBottle();
      this.checkThrowObjects();
    }, 200)
  }

  checkCollisions() {
    this.checkEnemyCollision();
    this.checkCoinCollision();
    this.checkBottleCollision();
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {

    
        const jumpedOnEnemy = 
          this.character.speedY < 0 &&
          this.character.y + this.character.height - this.character.offset.bottom > enemy.y + enemy.offset.top

      if (jumpedOnEnemy) {
        console.log("Jump-Attacke auf Enemy!");
        enemy.health = 0;
        enemy.speed =
        enemy.dead = true;
        enemy.playAnimation(enemy.IMAGES_DEAD);

        // if (enemy.isDead()) {
        //   this.removeEnemy(enemy);
        // }

        // this.character.jump(); // Bounce
      } else {

        this.character.hit();
        this.StatusBarHealth.setPercentage(this.character.health);
        }
      }
    });
  }

  // this.y + this.height - this.offset.bottom > mo.y + mo.offset.top

  // checkEndbossHitByBottle() {
  //   this.throwableObjects.forEach((bottle) => {
  //     if (this.endboss.isColliding(bottle)) {
  //       console.log("Endboss wurde getroffen!");
  //       console.log(this.endboss.health);
  //       this.endboss.hit();
  //       this.StatusBarEndboss.setPercentage(this.endboss.health);
  //     }
  //   });
  // }

checkEndbossHitByBottle() {
  for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
    const bottle = this.throwableObjects[i];

    if (this.endboss.isColliding(bottle)) {
      
      if (!this.endboss.isHurt()) {
        this.endboss.hit();
        this.StatusBarEndboss.setPercentage(this.endboss.health);
      }

      
      this.throwableObjects.splice(i, 1);
    }
  }
}




  checkEnemyHitByBottle() {
  this.throwableObjects.forEach((bottle) => {
    this.level.enemies.forEach((enemy) => {

      if (enemy.isColliding(bottle)) {
        console.log("Enemy wurde getroffen!", enemy);

        enemy.hit(); // zieht Health ab 

        // Optional: Gegner löschen, wenn tot
        // if (enemy.isDead()) {
        //   this.removeEnemy(enemy);
        // }

      }
    });
  });
}


// removeEnemy(enemy) {
//   const index = this.level.enemies.indexOf(enemy);
//   if (index > -1) {
//     this.level.enemies.splice(index, 1);
//   }
// }

  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      
      if (this.character.isColliding(coin)) {
        this.character.coins++;

        const percentage = (this.character.coins / this.totalCoins) * 100;
        this.StatusBarCoin.setPercentage(percentage);

        this.level.coins.splice(index, 1);
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach((bottle, index) => {
      
      if (this.character.isColliding(bottle)) {
        this.character.bottles++;

        const percentage = (this.character.bottles / this.totalBottles) * 100;
        this.StatusBarBottle.setPercentage(percentage);

        this.level.bottles.splice(index, 1); 
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.character.bottles > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 100
        );
        this.throwableObjects.push(bottle);
        this.character.bottles--;
        const percentage = (this.character.bottles / this.totalBottles) * 100; 
        this.StatusBarBottle.setPercentage(percentage);
      } else {
        console.log("Keine Bottle verfügbar"); 
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 

    this.ctx.translate(this.camera_x, 0); 
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); 
    this.addToMap(this.StatusBarHealth);
    this.addToMap(this.StatusBarCoin);
    this.addToMap(this.StatusBarBottle);
    this.addToMap(this.StatusBarEndboss);
    this.ctx.translate(this.camera_x, 0); 

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.character); 
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects); 

    this.ctx.translate(-this.camera_x, 0); 

    
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    

    if (mo.otherDirection) {
      
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    mo.drawFrame(this.ctx); 

    if (mo.otherDirection) {
      
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save(); 
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1; 
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
}
