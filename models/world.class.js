/**
 * Represents the game world, containing the player character, enemies, items, and all interactions.
 * Handles rendering, collisions, and game logic.
 * @class
 */
class World {
  gameIsOver = false;
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    EndbossHealthBar = new EndbossHealthBar(this.level.endboss.x);
    throwableObjects = [];
     


    /**
     * Initializes a new game world with a canvas and keyboard input handler.
     * @param {HTMLCanvasElement} canvas - Canvas element for rendering.
     * @param {Keyboard} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.daedChicken();
        this.run();
        
    }

    /**
     * Assigns the world reference to the character and end boss.
     */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this; 
    }

    /**
     * Renders all game objects and updates each animation frame.
     */
   draw() {
    if (this.gameIsOver) return; // 👈 Stoppt das Zeichnen, sobald das Spiel vorbei ist

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.camera_x, 0);
    this.drawDynamicObjects();
    this.drawStaticObjects();
    this.ctx.translate(this.camera_x, 0);

    requestAnimationFrame(() => this.draw());
}


    /**
     * Draws dynamic objects including the player, enemies, items, and moving elements.
     */
    drawDynamicObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.addToMap(this.EndbossHealthBar);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws static objects like HUD elements and health bars.
     */
    drawStaticObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds multiple objects to the map for rendering.
     * @param {MovableObject[]} objects - Array of objects to render.
     */
    addObjectsToMap(objects) {
        objects.forEach(mo => this.addToMap(mo));
    }

    /**
     * Adds a single object to the map, handling flipping if needed.
     * @param {MovableObject} mo - Object to render.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally for rendering.
     * @param {MovableObject} mo - Object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object to its original orientation after flipping.
     * @param {MovableObject} mo - Object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Periodically removes dead chickens from the level.
     */
    daedChicken() {
        setInterval(() => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy.energy == 0) {
                    this.level.enemies.splice(index, 1);
                }
            });
        }, 1000);
    }

    /**
     * Checks if the player throws a bottle and handles creating and launching it.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles >= 20 && !this.character.otherDirection) {
            let bottleX = this.character.x + (this.character.otherDirection ? -20 : 100);
            let bottleY = this.character.y + 60;
            let bottle = new ThrowableObject(bottleX, bottleY);
            bottle.otherDirection = this.character.otherDirection;
            this.throwableObjects.push(bottle);
            this.character.reduceBottlesAmount();
            this.bottleBar.setPercentage(this.character.bottles);
            this.keyboard.D = false;
            this.character.idleTime = 0;
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies or the end boss.
     */
    checkBottleCollissionEnemy() {
        this.throwableObjects.forEach((throwableObject) => {
            if (this.level.endboss.isColliding(throwableObject)) {
                if (this.level.endboss.energy > 0) {
                    this.hurtEndboss(throwableObject);
                } else {
                    this.enemyDefeat(throwableObject, this.level.endboss);
                }
            }
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(throwableObject)) {
                    this.enemyDefeat(throwableObject, enemy);
                }
            })
        })
    }

    /**
     * Reduces the end boss's energy when hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object that hit the end boss.
     */
    hurtEndboss(throwableObject) {
        this.level.endboss.hit(0.8);
        throwableObject.splash();
        this.EndbossHealthBar.setPercentage(this.level.endboss.energy);
    }

    /**
     * Kills an enemy or end boss when hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object that caused the defeat.
     * @param {MovableObject} enemy - The enemy or boss to defeat.
     */
    enemyDefeat(throwableObject, enemy) {
        enemy.isDead();
        throwableObject.splash();
    }

    /**
     * Continuously checks for collisions between the character and enemies, coins, or bottles.
     */
    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                this.enemyCollision(enemy);
            });
            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin))
                    this.coinCollision(index);
            });
            this.level.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle) && this.character.bottles < 100)
                    this.bottleCollision(index);
            });
        }, 50);
    }

    /**
     * Handles collisions between the player and an enemy.
     * @param {MovableObject} enemy - Enemy to check collision with.
     */
    enemyCollision(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && this.character.speedY < 0) {
                this.character.speedY += 25
                
                enemy.isDead();
            } else {
                if (enemy.energy > 0) {
                    this.character.hit(1);
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        }
    }

    /**
     * Handles collecting coins when the character collides with them.
     * @param {number} index - Coin index in the level array.
     */
    coinCollision(index) {
        this.level.coins.splice(index, 1);
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
    }

    /**
     * Handles collecting bottles when the character collides with them.
     * @param {number} index - Bottle index in the level array.
     */
    bottleCollision(index) {
        this.level.bottles.splice(index, 1);
        this.character.collectBottles();
        this.bottleBar.setPercentage(this.character.bottles);
    }

    /**
     * Checks if the end boss is in attack range and triggers attacks on the player.
     */
    checkEndbossAttackRange() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;
        if (Math.abs(distanceToEndboss) < 400 && this.level.endboss.energy > 0 && this.character.energy > 0) {
            this.level.endboss.attack();
        } else {
            this.level.endboss.stopAttack();
        }
        if (Math.abs(distanceToEndboss) < 80 && this.level.endboss.energy > 0 && this.character.energy > 0) {
            this.character.hit(15);
            this.healthBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for the first encounter with the end boss and triggers its alert animation.
     */
    checkFirstEndbossContact() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;
        if (distanceToEndboss < 600 && !this.level.endboss.firstContact) {
            this.level.endboss.firstContact = true;
            this.level.endboss.playAnimation(this.level.endboss.IMAGES_ALERT);
            setStoppableInterval(() => {
                this.level.endboss.moveLeftBoss();
                this.EndbossHealthBar.moveHealthbar(this.level.endboss.x);
            }, 500);
            this.level.endboss.animate();
        }
    }

    /**
     * Starts the main game loop, handling throws, collisions, and end boss interactions.
     */
    run() {
        setInterval(() => {
            if (!this.level || !this.level.endboss) return;
            this.checkThrowObjects();
            this.checkBottleCollissionEnemy();
            this.checkFirstEndbossContact();
        }, 20);

        setInterval(() => {
            if (!this.level || !this.level.endboss) return;
            this.checkEndbossAttackRange();
        }, 400);
    }

}
