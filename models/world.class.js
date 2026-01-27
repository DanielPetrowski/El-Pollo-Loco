/**
 * Represents the game world, including the character, enemies, objects, and interactions.
 * @class
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossLifebar = new EndbossLifebar(this.level.endboss.x);
    throwableObjects = [];

    /**
     * Creates a new instance of the game world.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollision();
        this.checkIfChickenAlive();
        this.run();
    }

    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
        this.level.endboss.world = this;
    }

    /**
     * Draws all objects in the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(-this.camera_x, 0);
        this.drawDynamicObjects();
        this.drawStaticObjects();
        this.ctx.translate(this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws dynamic objects such as the character, enemies, and items.
     */
    drawDynamicObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.addToMap(this.endbossLifebar);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws static objects such as health bars and HUD elements.
     */
    drawStaticObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds multiple objects to the map.
     * @param {MovableObject[]} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(mo => this.addToMap(mo));
    }

    /**
     * Adds a single object to the map.
     * @param {MovableObject} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    /**
     * Flips the image horizontally for rendering.
     * @param {MovableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {MovableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if chickens are alive and removes dead ones from the level.
     */
    checkIfChickenAlive() {
        setInterval(() => {
            this.level.enemies = this.level.enemies.filter(enemy => enemy.energy > 0);
        }, 1000);
    }

    /**
     * Checks if the player throws an object and handles the logic for throwable objects.
     */
    checkThrowObjects() {
        if (this.keyboard.X && this.character.bottles >= 20 && !this.character.otherDirection) {
            this.createThrowableObject();
        }
    }

    /**
     * Creates a throwable object at the character's position.
     */
    createThrowableObject() {
        let bottleX = this.character.x + (this.character.otherDirection ? -20 : 100);
        let bottleY = this.character.y + 60;
        let bottle = new ThrowableObject(bottleX, bottleY);
        bottle.otherDirection = this.character.otherDirection;
        this.throwableObjects.push(bottle);
        this.character.reduceBottlesAmount();
        this.bottleBar.setPercentage(this.character.bottles);
        this.keyboard.X = false;
        this.character.idleTime = 0;
    }

    /**
     * Checks if throwable objects hit enemies or the end boss.
     */
    checkBottleHitsEnemies() {
        this.throwableObjects.forEach(throwableObject => {
            this.checkEndbossCollision(throwableObject);
            this.checkEnemyCollisions(throwableObject);
        });
    }

    /**
     * Checks collision between a throwable object and the end boss.
     * @param {ThrowableObject} throwableObject - The throwable object to check.
     */
    checkEndbossCollision(throwableObject) {
        if (this.level.endboss.isColliding(throwableObject)) {
            this.level.endboss.energy > 0
                ? this.hurtEndboss(throwableObject)
                : this.killEnemy(throwableObject, this.level.endboss);
        }
    }

    /**
     * Checks collisions between a throwable object and enemies.
     * @param {ThrowableObject} throwableObject - The throwable object to check.
     */
    checkEnemyCollisions(throwableObject) {
        this.level.enemies.forEach(enemy => {
            if (enemy.isColliding(throwableObject)) {
                this.killEnemy(throwableObject, enemy);
            }
        });
    }

    /**
     * Reduces the end boss's energy when hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object that hit the end boss.
     */
    hurtEndboss(throwableObject) {
        this.level.endboss.hit(0.37);
        throwableObject.splash();
        this.endbossLifebar.setPercentage(this.level.endboss.energy);
    }

    /**
     * Kills an enemy or the end boss when hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object that hit the enemy.
     * @param {MovableObject} enemy - The enemy to kill.
     */
    killEnemy(throwableObject, enemy) {
        enemy.isDead();
        throwableObject.splash();
    }

    /**
     * Checks for collisions between the character and other objects.
     */
    checkCollision() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => this.handleEnemyCollision(enemy));
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 50);
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) this.handleCoinCollision(index);
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 100) {
                this.handleBottleCollision(index);
            }
        });
    }

    /**
     * Handles collisions between the character and enemies.
     * @param {MovableObject} enemy - The enemy to check for collisions.
     */
    handleEnemyCollision(enemy) {
        if (this.character.isColliding(enemy)) {
            this.character.isAboveGround() && this.character.speedY < 0
                ? enemy.isDead()
                : this.damageCharacter(enemy);
        }
    }

    /**
     * Damages the character when colliding with an enemy.
     * @param {MovableObject} enemy - The enemy causing the damage.
     */
    damageCharacter(enemy) {
        if (enemy.energy > 0) {
            this.character.hit(1);

            this.healthBar.setPercentage(this.character.energy);
           
        }
    }

    /**
     * Handles collisions between the character and coins.
     * @param {number} index - The index of the coin in the level's coin array.
     */
    handleCoinCollision(index) {
        this.level.coins.splice(index, 1);
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
    }

    /**
     * Handles collisions between the character and bottles.
     * @param {number} index - The index of the bottle in the level's bottle array.
     */
    handleBottleCollision(index) {
        this.level.bottles.splice(index, 1);
        this.character.collectBottles();
        this.bottleBar.setPercentage(this.character.bottles);
    }

    /**
     * Checks if the end boss is within attack range and triggers its attack.
     */
    checkEndbossAttackRange() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;
        if (Math.abs(distanceToEndboss) < 400) this.handleEndbossAttack(distanceToEndboss);
    }

    /**
     * Handles the end boss's attack behavior based on the character's distance.
     * @param {number} distanceToEndboss - The distance between the character and the end boss.
     */
    handleEndbossAttack(distanceToEndboss) {
        if (this.level.endboss.energy > 0 && this.character.energy > 0) {
            this.level.endboss.attack();
            if (Math.abs(distanceToEndboss) < 80) this.damageCharacterByEndboss();
        } else {
            this.level.endboss.stopAttack();
        }
    }

    /**
     * Damages the character when attacked by the end boss.
     */
    damageCharacterByEndboss() {
        this.character.hit(15);
        this.healthBar.setPercentage(this.character.energy);
    }

    /**
     * Checks if the character has made first contact with the end boss and starts its animation.
     */
    checkFirstEndbossContact() {
        const distanceToEndboss = this.level.endboss.x - this.character.x;
        if (distanceToEndboss < 600 && !this.level.endboss.firstContact) {
            this.startEndbossAnimation();
        }
    }

    /**
     * Starts the end boss's animation and movement when first contacted by the character.
     */
    startEndbossAnimation() {
        this.level.endboss.firstContact = true;
        this.level.endboss.playAnimation(this.level.endboss.IMAGES_ALERT);
        setStoppableInterval(() => {
            this.level.endboss.moveLeftBoss();
            this.endbossLifebar.moveLifebar(this.level.endboss.x);
        }, 500);
        this.level.endboss.animate();
    }

    /**
     * Runs the main game logic, including checking for object throws and collisions.
     */
    run() {
        setInterval(() => {
            if (!this.level || !this.level.endboss) return;
            this.checkThrowObjects();
            this.checkBottleHitsEnemies();
            this.checkFirstEndbossContact();
        }, 20);

        setInterval(() => {
            if (!this.level || !this.level.endboss) return;
            this.checkEndbossAttackRange();
        }, 400);
    }
}