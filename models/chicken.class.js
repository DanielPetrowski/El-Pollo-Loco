/**
 * Represents a chicken enemy in the game.
 * Extends the MovableObject class to inherit movement functionality.
 * @class
 */
class Chicken extends MovableObject {
    /**
     * The y-coordinate of the chicken.
     * @type {number}
     */
    y = 350;

    /**
     * The height of the chicken.
     * @type {number}
     */
    height = 80;

    /**
     * The width of the chicken.
     * @type {number}
     */
    width = 90;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array containing the image path for the dead animation.
     * @type {string[]}
     */
    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Array to store interval IDs for chicken-specific animations.
     * @type {number[]}
     */
    chickenIntervalIds = [];

    /**
     * The offset for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };

    /**
     * Audio for the chicken's death sound.
     * @type {Audio}
     */
    dead_sound = new Audio('Audio/hitChicken.mp3');

    /**
     * Creates a new Chicken.
     * Loads images, sets random position and speed, and starts animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }

    /**
     * Starts the animation intervals for the chicken.
     * Handles movement and walking animation.
     */
    animate() {
        this.setStoppableIntervalChicken(() => {
            this.moveLeft();
        }, 60 / 1000);

        this.setStoppableIntervalChicken(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Sets an interval for chicken-specific animations and stores the interval ID.
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
     * Plays the dead animation and clears all chicken-specific intervals.
     */
    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
     * Marks the chicken as dead, plays the death sound, and triggers the dead animation.
     */
    isDead() {
        if (mute == false && this.dead_sound.readyState == 4) {
            this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}