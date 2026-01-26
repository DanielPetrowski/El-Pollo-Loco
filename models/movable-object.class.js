/**
 * Represents a movable object in the game, such as characters or items.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * The horizontal speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates whether the object is facing the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration applied to the object.
     * @type {number}
     */
    acceleration = 2;

    /**
     * The energy level of the object.
     * @type {number}
     */
    energy = 100;

    /**
     * The timestamp of the last hit the object received.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The interval ID for applying gravity.
     * @type {number}
     */
    applyGravityInterval;

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    animationIndexes = {
        idle: 0,
        idleLong: 0,
        walk: 0,
        jump: 0,
        hurt: 0,
        dead: 0
    };

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Applies gravity to the object, causing it to fall if above ground.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 159;
        }
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation by cycling through the provided images.
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images, type = 'default') {
        if (!this.animationIndexes[type] && this.animationIndexes[type] !== 0) {
            this.animationIndexes[type] = 0;
        }
        let i = this.animationIndexes[type] % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.animationIndexes[type]++;
    }

    /**
     * Plays an animation once by cycling through the provided images.
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimationOnce(images, type = 'default') {
        let i = this.animationIndexes[type] % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        if (i < images.length - 1) {
            this.animationIndexes[type]++;
        }
    }

    /**
     * Reduces the energy of the object when it takes damage.
     * @param {number} damage - The amount of damage to apply.
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead (energy is 0 or less).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Checks if the object is currently hurt (recently hit).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }
}