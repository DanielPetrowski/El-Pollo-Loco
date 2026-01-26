/**
 * Represents the end boss in the game, including its animations, attacks, and behaviors.
 * @class
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x;
    speed = 90;
    firstContact = false;

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 80,
        left: 100,
        right: 0,
        bottom: 0
    };

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Stores interval IDs for managing stoppable intervals.
     * @type {number[]}
     */
    endbossIntervalIds = [];

    /**
     * Creates a new instance of the Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2200;
        this.isAttacking = false;
    }

    /**
     * Starts the animations for the end boss, including walking, attacking, and other states.
     */
    animate() {
        this.setStoppableIntervalEndboss(this.handleEndbossWalk.bind(this), 200);
        setStoppableInterval(this.handleEndbossAttack.bind(this), 100);
        setStoppableInterval(this.handleEndbossDeath.bind(this), 200);
        setStoppableInterval(this.handleEndbossHurt.bind(this), 400);
    }

    /**
     * Handles the walking animation of the end boss.
     */
    handleEndbossWalk() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handles the attack animation of the end boss.
     */
    handleEndbossAttack() {
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Handles the death animation of the end boss and triggers the game win condition.
     */
    handleEndbossDeath() {
        if (this.energy == 0) {
            this.endbossIntervalIds.forEach(clearInterval);
            this.speed = 0;
            this.playAnimationOnce(this.IMAGES_DEAD);
            setTimeout(() => {
                wonGame();
            }, 1000);
        }
    }

    /**
     * Handles the hurt animation of the end boss when it takes damage.
     */
    handleEndbossHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Starts the attack behavior of the end boss.
     */
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
        }
    }

    /**
     * Stops the attack behavior of the end boss.
     */
    stopAttack() {
        this.isAttacking = false;
    }

    /**
     * Sets a stoppable interval for the end boss and stores the interval ID.
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStoppableIntervalEndboss(fn, time) {
        let id = setInterval(fn, time);
        this.endbossIntervalIds.push(id);
        intervalIds.push(id);
    }

    /**
     * Reduces the energy of the end boss when it takes damage.
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

    moveLeftBoss() {
        const char = this.world.character;
        const bossLeft = this.x + this.offset.left;
        const charRight = char.x + char.width - char.offset.right;

        if (bossLeft > charRight) {
            this.x -= Math.min(this.speed, bossLeft - charRight);
        }
    }
}