/**
 * Represents a small chicken enemy in the game.
 * @class
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    y = 380;
    height = 40;
    width = 60;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Stores interval IDs for managing stoppable intervals.
     * @type {number[]}
     */
    chickenIntervalIds = [];

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 0
    };

    /**
     * Sound effect played when the small chicken dies.
     * @type {HTMLAudioElement}
     */
    dead_sound = new Audio('Audio/hitChicken.mp3');

    /**
     * Creates a new instance of a SmallChicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 400 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.20;
        this.animate();
    }

    /**
     * Animates the small chicken by moving it and playing its walking animation.
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
     * Sets a stoppable interval for the small chicken and stores the interval ID.
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStoppableIntervalChicken(fn, time) {
        let id = setInterval(fn, time);
        this.chickenIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
     * Animates the small chicken's death by stopping its movement and playing the dead animation.
     */
    animateDead() {
        this.chickenIntervalIds.forEach(clearInterval);
        this.playAnimation(this.IMAGE_DEAD);
    }

    /**
     * Marks the small chicken as dead, plays the death sound, and triggers the death animation.
     */
    isDead() {
        if (mute == false && this.dead_sound.readyState == 4) {
            this.dead_sound.play();
        }
        this.energy = 0;
        this.animateDead();
    }
}