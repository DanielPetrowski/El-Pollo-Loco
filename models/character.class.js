/**
 * Represents the main playable character in the game.
 * Inherits movement, gravity, and animation features from the MovableObject class.
 * @class
 */
class Character extends MovableObject {
    /**
     * Height of the character sprite.
     * @type {number}
     */
    height = 280;

    /**
     * Width of the character sprite.
     * @type {number}
     */
    width = 140;

    /**
     * Vertical position of the character on the canvas.
     * @type {number}
     */
    y = 160;

    /**
     * Image paths used for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Image paths used for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Image paths used for the extended idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Image paths used for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Image paths used for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Image paths used for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Reference to the game world object.
     * @type {World}
     */
    world;

    /**
     * Movement speed of the character.
     * @type {number}
     */
    speed = 4;

    /**
     * Number of coins collected by the character.
     * @type {number}
     */
    coins = 0;

    /**
     * Number of bottles collected by the character.
     * @type {number}
     */
    bottles = 0;

    /**
     * Counter for tracking idle time.
     * @type {number}
     */
    idleTime = 0;

    /**
     * Collision detection offsets for each side of the character.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 100,
        bottom: 0,
        left: 10,
        right: 30
    };

    /**
     * Indicates whether the character is currently in the air.
     * @type {boolean}
     */
    isCharacterAboveGround = false;

    /**
     * Flag to track whether the jumping animation is active.
     */
    jumpAnimatioon = false;

    /**
     * Audio object for the walking sound effect.
     * @type {Audio}
     */
    walking_sound = new Audio("audio/Walking.mp3");

    /**
     * Audio object for the jumping sound effect.
     * @type {Audio}
     */
    jumping_sound = new Audio("audio/Jump.mp3");

    /**
     * Audio object for the hurt sound effect.
     * @type {Audio}
     */
    hurt_sound = new Audio("audio/CharacterHit.mp3");

    /**
     * Audio object for the death sound effect.
     * @type {Audio}
     */
    dead_sound = new Audio("audio/GameOver.mp3");

    /**
     * Audio object for the coin collection sound effect.
     * @type {Audio}
     */
    coin_sound = new Audio("audio/CoinCollect.mp3");

    /**
     * Audio object for the bottle collection sound effect.
     * @type {Audio}
     */
    bottle_sound = new Audio("audio/BottleCollect.mp3");

    /**
     * Initializes the character, loads images, applies gravity, and starts animations.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();

        this.walking_sound.volume = 0.2;
        this.jumping_sound.volume = 0.2;
        this.hurt_sound.volume = 0.2;
        this.dead_sound.volume = 0.2;
        this.coin_sound.volume = 0.2;
        this.bottle_sound.volume = 0.2;
    }

    /**
     * Starts the character's animations using repeated intervals.
     */
    animate() {
        setStoppableInterval(this.characterMovement.bind(this), 1000 / 60);
        setStoppableInterval(this.jumpingAnimation.bind(this), 150);
        setStoppableInterval(this.characterAnimation.bind(this), 50);
        setStoppableInterval(this.idleAnimation.bind(this), 240);
    }

    /**
     * Handles character movement based on user input.
     */
    characterMovement() {
        this.walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();

        if (this.canMoveLeft())
            this.moveLeft();

        if (this.canJump()) {
            this.jump();
            this.idleTime = 0;
        }
        this.world.camera_x = this.x - 50;
    }

    /**
     * Plays the appropriate animation based on character state.
     */
    characterAnimation() {
        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (!mute) {
                this.hurt_sound.play();
            }
        } else if (!this.isAboveGround()) {
            this.isCharacterAboveGround = false;
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Animates the character while jumping.
     */
    jumpingAnimation() {
        if (this.isAboveGround()) {
            if (!this.jumpAnimatioon) {
                this.jumpAnimatioon = true;
                this.currentImage = 0;
            }

            const i = this.currentImage % this.IMAGES_JUMPING.length;
            const path = this.IMAGES_JUMPING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            this.jumpAnimatioon = false;
            this.currentImage = 0;
        }
    }

    /**
     * Handles the idle animation when the character is not performing actions.
     */
    idleAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.X && !this.isHurt()) {
            if (this.idleTime < 20) {
                this.idleTime++;
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE_LONG);
            }
        }
    }

    /**
     * Checks if the character is allowed to move right.
     * @returns {boolean}
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.idleTime = 0;
        if (this.y > 158 && !mute) {
            this.walking_sound.play();
        }
    }

    /**
     * Checks if the character is allowed to move left.
     * @returns {boolean}
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.idleTime = 0;
        if (this.y > 158 && !mute) {
            this.walking_sound.play();
        }
    }

    /**
     * Checks if the character can perform a jump.
     * @returns {boolean}
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump and plays jump sound.
     */
    jump() {
        this.jumping_sound = new Audio("audio/Jump.mp3");
        if (!mute) {
            this.jumping_sound.play();
        }
        this.speedY = 30;
    }

    /**
     * Collects coins and plays a collection sound.
     */
    collectCoins() {
        this.coin_sound = new Audio("audio/CoinCollect.mp3");
        if (!mute) {
            this.coin_sound.play();
        }
        this.coins += 10;
    }

    /**
     * Collects bottles and plays a collection sound.
     */
    collectBottles() {
        this.bottle_sound = new Audio("Audio/BottleCollect.mp3");
        if (!mute) {
            this.bottle_sound.play();
        }
        this.bottles += 20;
        if (this.bottles > 100) this.bottles = 100;
    }

    /**
     * Reduces the number of bottles in inventory.
     */
    reduceBottlesAmount() {
        this.bottles -= 20;
    }
}
