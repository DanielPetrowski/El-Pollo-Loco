/**
 * Represents a chicken enemy in the game.
 * Inherits movement behavior from MovableObject.
 * @class
 */
class Chicken extends MovableObject {
    /**
     * Vertical position of the chicken on the canvas.
     * @type {number}
     */
    y = 350;

    /**
     * Height of the chicken sprite.
     * @type {number}
     */
    height = 80;

    /**
     * Width of the chicken sprite.
     * @type {number}
     */
    width = 90;

    /**
     * Paths to images used for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Path to the image used for the dead animation.
     * @type {string[]}
     */
    IMAGE_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Stores interval IDs for chicken-specific animations.
     * @type {number[]}
     */
    chickenID = [];

    /**
     * Collision detection offsets for each side of the chicken.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };

    /**
     * Audio object for the chicken's death sound effect.
     * @type {Audio}
     */
    dead_sound = new Audio("Audio/hitChicken.mp3");

    /**
     * Initializes a new chicken.
     * Loads images, assigns random position and speed, and starts its animations.
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
     * Begins the chicken's animations, including movement and walking cycles.
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
     * Creates a stoppable interval for chicken-specific actions and stores its ID.
     * @param {Function} fn - The function to execute repeatedly.
     * @param {number} time - Interval duration in milliseconds.
     */
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenID.push(id);
        intervalIds.push(id);
    }

    /**
     * Plays the dead animation and clears all active chicken intervals.
     */
    animateDead() {
        this.chickenID.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
     * Marks the chicken as dead, plays the death sound, and triggers the death animation.
     */
    isDead() {
        if (mute == false) {
            this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}
