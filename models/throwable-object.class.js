/**
 * Represents a throwable object in the game, such as a salsa bottle.
 * Can be thrown by the player, applies gravity, and shows a splash animation on impact.
 * @class
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    /**
     * Image paths for the throwing animation sequence.
     * @type {string[]}
     */
    IMAGES_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * Image paths for the splash animation sequence.
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
     * Sound effect played when the bottle hits the ground and splashes.
     * @type {HTMLAudioElement}
     */
    splash_sound = new Audio("Audio/bottleSplash.mp3");

    /**
     * Stores interval IDs for managing animation and movement of the bottle.
     * @type {number[]}
     */
    bottleIntervalIds = [];

    /**
     * Creates a new ThrowableObject.
     * @param {number} x - Initial horizontal position.
     * @param {number} y - Initial vertical position.
     * @param {boolean} otherDirection - Indicates whether the object is thrown in the opposite direction.
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
     * Initiates the throw of the object by applying gravity and horizontal movement.
     * Animates the object while in motion and triggers splash on impact.
     */
    throw() {
        if (this.otherDirection) {
            return; // Prevent throwing if facing left
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
     * Plays the splash animation, stops all intervals, and removes the bottle from view after a delay.
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
     * Creates a stoppable interval for the bottle and stores the interval ID for later clearing.
     * @param {Function} fn - Function to execute at each interval tick.
     * @param {number} time - Interval duration in milliseconds.
     */
    setStoppableIntervalBottle(fn, time) {
        let id = setInterval(fn, time);
        this.bottleIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
     * Applies gravity to the bottle, causing it to fall if above ground, updating vertical speed each frame.
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
