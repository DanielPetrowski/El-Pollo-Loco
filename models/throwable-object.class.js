/**
 * Represents a throwable object, such as a salsa bottle, in the game.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Array of image paths for the throwing animation.
     * @type {string[]}
     */
    IMAGES_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Array of image paths for the splash animation.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Sound effect played when the bottle splashes.
     * @type {HTMLAudioElement}
     */
    splash_sound = new Audio('Audio/bottleSplash.mp3');

    /**
     * Stores interval IDs for managing stoppable intervals.
     * @type {number[]}
     */
    bottleIntervalIds = [];

    /**
     * Creates a new instance of a ThrowableObject.
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     * @param {boolean} otherDirection - Indicates the direction of the throw.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
     * Throws the object, applying gravity and horizontal movement.
     */
    throw() {
        if (this.otherDirection) {
            return;
        }
        this.speedY = 20;
        this.applyGravity();
        let horizontalSpeed = this.otherDirection ? -10 : 10;

        this.setStoppableIntervalBottle(() => {
            this.x += horizontalSpeed;
        }, 25);

        this.setStoppableIntervalBottle(() => {
            this.playAnimation(this.IMAGES_THROW);
            if (this.y >= 290) {
                this.splash();
            }
        }, 70);
    }

    /**
     * Plays the splash animation and stops all intervals related to the object.
     */
    splash() {
        if (mute == false) {
            this.splash_sound.play();
        }

        this.playAnimationOnce(this.IMAGES_SPLASH);
        this.bottleIntervalIds.forEach(clearInterval);

        setTimeout(() => {
            this.x = -4000;
        }, 1000);
    }

    /**
     * Sets a stoppable interval for the throwable object and stores the interval ID.
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStoppableIntervalBottle(fn, time) {
        let id = setInterval(fn, time);
        this.bottleIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
     * Applies gravity to the object, causing it to fall if above ground.
     */
    applyGravity() {
        this.setStoppableIntervalBottle(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
}