/**
 * Represents the end boss in the game, including its movements, attacks, animations, and behaviors.
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
     * Defines the collision boundaries for the end boss.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 80,
        left: 100,
        right: 0,
        bottom: 0
    };

    /**
     * Collection of images used for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Collection of images used for the alert animation.
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
     * Collection of images used for the attack animation.
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
     * Collection of images used for the hurt animation when the boss takes damage.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Collection of images used for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Stores IDs of intervals for managing animations and behaviors.
     * @type {number[]}
     */
    intervallIDs = [];

    /**
     * Initializes a new Endboss instance, loads all animations, and sets its starting position.
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
     * Starts all animations and behaviors for the end boss.
     */
    animate() {
        this.setStoppableIntervalEndboss(this.endbossWalking.bind(this), 200);
        setStoppableInterval(this.endbossAttacking.bind(this), 100);
        setStoppableInterval(this.endbossDeath.bind(this), 200);
        setStoppableInterval(this.endbossHurt.bind(this), 400);
    }

    /**
     * Plays the walking animation sequence for the end boss.
     */
    endbossWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Plays the attack animation if the end boss is currently attacking.
     */
    endbossAttacking() {
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Plays the death animation and stops all intervals when the boss's energy reaches zero.
     * Triggers the game win condition after a short delay.
     */
    endbossDeath() {
        if (this.energy == 0) {
            this.intervallIDs.forEach(clearInterval);
            this.speed = 0;
            this.playAnimationOnce(this.IMAGES_DEAD);
            setTimeout(() => {
                wonGame();
            }, 1000);
        }
    }

    /**
     * Plays the hurt animation when the end boss takes damage.
     */
    endbossHurt() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }

    /**
     * Activates the attack behavior of the end boss.
     */
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
        }
    }

    /**
     * Deactivates the attack behavior of the end boss.
     */
    stopAttack() {
        this.isAttacking = false;
    }

    /**
     * Sets a stoppable interval for end boss behavior and stores its ID for later clearing.
     * @param {Function} fn - The function to execute repeatedly.
     * @param {number} time - Interval duration in milliseconds.
     */
    setStoppableIntervalEndboss(fn, time) {
        let id = setInterval(fn, time);
        this.intervallIDs.push(id);
        intervalIds.push(id);
    }

    /**
     * Reduces the end boss's energy by the specified damage amount.
     * Ensures energy does not drop below zero.
     * @param {number} damage - The damage to apply to the boss.
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
     * Moves the boss towards the player character while respecting collision offsets.
     * Stops moving when reaching the character.
     */
    moveLeftBoss() {
        let char = this.world.character;

        // Calculate boss's left edge with offset
        let bossLeft = this.x + this.offset.left;

        // Calculate character's right edge
        let charRight = char.x + char.width - char.offset.right;

        // Move left until reaching the character
        if (bossLeft > charRight) {
            this.x -= Math.min(this.speed, bossLeft - charRight);
        }
        // Stop when bossLeft <= charRight
    }
}
