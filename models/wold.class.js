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
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.totalCoins = this.level.coins.length;
    this.totalBottles = this.level.bottles.length;
    this.endboss = this.level.enemies[this.level.enemies.length - 1];
    this.throwCooldown = 1000; // 1000 ms = 1 Sekunde Cooldown
this.lastThrowTime = 0;    // Zeitpunkt der letzten Flasche

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
    }, 16);
  }

  // === Statusbar aktualisieren ===
updateBottleStatusBar() {
    // Berechne Prozente basierend auf character.bottles
    const percentage = (this.character.bottles / this.totalBottles) * 100;
    this.StatusBarBottle.setPercentage(percentage);
}

  // === Kollisionen prüfen ===
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
          this.character.y + this.character.height - this.character.offset.bottom >
            enemy.y + enemy.offset.top;

        if (jumpedOnEnemy) {
          console.log("Jump-Attacke auf Enemy!");
          enemy.health = 0;
          enemy.dead = true;
          enemy.playAnimation(enemy.IMAGES_DEAD);
        } else {
          this.character.hit();
          this.StatusBarHealth.setPercentage(this.character.health);
        }
      }
    });
  }

checkEndbossHitByBottle() {
  for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
    const bottle = this.throwableObjects[i];

    if (this.endboss.isColliding(bottle)) {
      // HP sofort reduzieren
      this.endboss.hit();

      // Statusbar sofort aktualisieren
      this.StatusBarEndboss.setPercentage(this.endboss.health);

      // Hurt-Animation starten
      this.endboss.startHurt();

      // Flasche entfernen
      this.throwableObjects.splice(i, 1);
    }
  }
}








  checkEnemyHitByBottle() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle)) {
          console.log("Enemy wurde getroffen!", enemy);
          enemy.hit();
        }
      });
    });
  }

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
    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle) && bottle.visible) {
            this.character.bottles++;

            // Nie mehr als totalBottles sammeln
            if (this.character.bottles > this.totalBottles) {
                this.character.bottles = this.totalBottles;
            }

            bottle.collect(); // macht visible = false und startet Respawn
            this.updateBottleStatusBar();
        }
    });
}

checkThrowObjects() {
  const now = new Date().getTime(); // aktueller Zeitstempel

  if (this.keyboard.D && this.character.bottles > 0) {
    if (now - this.lastThrowTime >= this.throwCooldown) {
      // Flasche erzeugen
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--;

      // Statusbar aktualisieren
      const percentage = Math.min((this.character.bottles / this.totalBottles) * 100, 100);
      this.StatusBarBottle.setPercentage(percentage);

      // Zeit des letzten Wurfs speichern
      this.lastThrowTime = now;
    }
  }
}


  // === Zeichnen ===
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
    objects.forEach((o) => this.addToMap(o));
  }
}
