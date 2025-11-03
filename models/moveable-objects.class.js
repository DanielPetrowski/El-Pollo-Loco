/**
 * Represents a game object that can move and interact with other objects.
 * This includes characters, enemies, and items that have motion and physics.
 * @class
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    /**
     * Horizontal movement speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Indicates whether the object is facing the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Vertical movement speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * Acceleration applied to vertical movement (e.g., gravity effect).
     * @type {number}
     */
    acceleration = 2;

    /**
     * The object's current energy or health level.
     * @type {number}
     */
    energy = 100;

    /**
     * Timestamp of the last hit the object received.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Interval ID used for applying gravity at regular intervals.
     * @type {number}
     */
    applyGravityInterval;

    /**
     * Collision offsets to fine-tune hitbox detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Tracks the current frame index for different animations.
     * @type {{idle: number, idleLong: number, walk: number, jump: number, hurt: number, dead: number}}
     */
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
     * @param {MovableObject} mo - The other object to check collision with.
     * @returns {boolean} True if the objects overlap, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Continuously applies gravity to the object, causing it to fall if above ground.
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
     * Determines if the object is above the ground level.
     * @returns {boolean} True if the object is above ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 160;
        }
    }

    /**
     * Moves the object to the right by its horizontal speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its horizontal speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays a looping animation by cycling through a set of images.
     * @param {string[]} images - Array of image paths for the animation.
     * @param {string} [type='default'] - Type of animation to track in animationIndexes.
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
     * Plays an animation once, cycling through the provided images only up to the last frame.
     * @param {string[]} images - Array of image paths for the animation.
     * @param {string} [type='default'] - Type of animation to track in animationIndexes.
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
     * Reduces the object's energy when it takes damage.
     * @param {number} damage - Amount of damage to apply.
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
     * Checks if the object is dead (energy has reached 0 or below).
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * Determines if the object is in a hurt state (recently received damage).
     * @returns {boolean} True if the object was hit within the last 0.3 seconds.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.3;
    }
}
