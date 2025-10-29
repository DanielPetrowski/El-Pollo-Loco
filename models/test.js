class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  StatusBarHealth = new StatusBarHealth();
  StatusBarCoin = new StatusBarCoin();
  StatusBarBottle = new StatusBarBottle();
  StatusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

  totalCoins;
  totalBottles;
  endboss;

  throwCooldown = 1000;
  lastThrowTime = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;

    this.setWorld();
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.endboss = this.level.enemies[this.level.enemies.length - 1];

    this.character.applyGravity();
    this.level.enemies.forEach(enemy => enemy.applyGravity());

    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkEndbossHitByBottle();
      this.checkEnemyHitByBottle();
      this.checkThrowObjects();

      this.character.update();
      this.level.enemies.forEach(enemy => enemy.update());
    }, 1000 / 60);
  }

  // ---------------- Kollisionen ----------------
  checkCollisions() {
    this.checkEnemyCollision();
    this.checkCoinCollision();
    this.checkBottleCollision();
  }

  checkEnemyCollision() {
    const tol = 30;
    this.level.enemies.forEach(enemy => {
      if (this.character.isColliding(enemy)) {
        const prev = this.character.oldY + this.character.height;
        const curr = this.character.y + this.character.height;

        if (this.character.speedY > 0 && prev <= enemy.y + tol && curr >= enemy.y - tol) {
          enemy.dead = true;
          enemy.playAnimation(enemy.IMAGES_DEAD);
          this.character.y = enemy.y - this.character.height;
          this.character.speedY = -20;

          setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) this.level.enemies.splice(index, 1);
          }, 2000);
        } else {
          this.character.hit();
          this.StatusBarHealth.setPercentage(this.character.health);
        }
      }
    });
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.character.coins++;
        this.StatusBarCoin.setPercentage((this.character.coins / this.totalCoins) * 100);
        this.level.coins.splice(i, 1);
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach(bottle => {
      if (this.character.isColliding(bottle) && bottle.visible) {
        this.character.bottles++;
        if (this.character.bottles > this.totalBottles) this.character.bottles = this.totalBottles;
        bottle.collect();
        this.updateBottleStatusBar();
      }
    });
  }

  checkEndbossHitByBottle() {
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      const bottle = this.throwableObjects[i];
      if (this.endboss.isColliding(bottle)) {
        this.endboss.hit();
        this.StatusBarEndboss.setPercentage(this.endboss.health);
        this.endboss.startHurt();
        this.throwableObjects.splice(i, 1);
      }
    }
  }

  checkEnemyHitByBottle() {
    this.throwableObjects.forEach(bottle => {
      this.level.enemies.forEach(enemy => {
        if (enemy.isColliding(bottle)) enemy.hit();
      });
    });
  }

  checkThrowObjects() {
    const now = new Date().getTime();
    if (this.keyboard.D && this.character.bottles > 0 && now - this.lastThrowTime >= this.throwCooldown) {
      const bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.StatusBarBottle.setPercentage((this.character.bottles / this.totalBottles) * 100);
      this.lastThrowTime = now;
    }
  }

  updateBottleStatusBar() {
    this.StatusBarBottle.setPercentage((this.character.bottles / this.totalBottles) * 100);
  }

  // ---------------- Zeichnen ----------------
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

    requestAnimationFrame(() => this.draw());
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
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
    objects.forEach(o => this.addToMap(o));
  }
}
