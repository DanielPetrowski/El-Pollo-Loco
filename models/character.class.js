/**
 * Represents the main character in the game.
 * Extends the MovableObject class to inherit movement and gravity functionality.
 * @class
 */

let walkingPlaying = false
class Character extends MovableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 280;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 140;

    /**
     * The y-coordinate of the character.
     * @type {number}
     */
    y = 160;

    /**
     * Array of image paths for the walking animation.
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
     * Array of image paths for the jumping animation.
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
     * Array of image paths for the dead animation.
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
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Array of image paths for the idle animation.
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
     * Array of image paths for the long idle animation.
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
     * Reference to the game world.
     * @type {World}
     */
    world;

    /**
     * The movement speed of the character.
     * @type {number}
     */
    speed = 4;

    /**
     * Audio for walking sound.
     * @type {Audio}
     */
    walking_sound = new Audio('Audio/Walking.mp3');

    /**
     * Audio for jumping sound.
     * @type {Audio}
     */
    jumping_sound = new Audio('Audio/Jump.mp3');

    /**
     * Audio for hurt sound.
     * @type {Audio}
     */
    hurt_sound = new Audio('Audio/CharacterHit.mp3');

    /**
     * Audio for dead sound.
     * @type {Audio}
     */
    dead_sound = new Audio('Audio/GameOver.mp3');

    /**
     * Audio for coin collection sound.
     * @type {Audio}
     */
    coin_sound = new Audio('Audio/CoinCollect.mp3');

    /**
     * Audio for bottle collection sound.
     * @type {Audio}
     */
    bottle_sound = new Audio('Audio/BottleCollect.mp3');

    /**
     * Audio for snoring sound.
     * @type {Audio}
     */
    snoring_sound = new Audio('Audio/Snoring.mp3');

    

    /**
     * The number of coins collected by the character.
     * @type {number}
     */
    coins = 0;

    /**
     * The number of bottles collected by the character.
     * @type {number}
     */
    bottles = 0;

    /**
     * The idle time of the character.
     * @type {number}
     */
    idleTime = 0;

    /**
     * The offset for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 100,
        bottom: 0,
        left: 10,
        right: 30
    };

    /**
     * Indicates whether the character is above the ground.
     * @type {boolean}
     */
    isCharacterAboveGround = false;

    isJumpingAnimationPlaying = false;

    /**
     * Creates a new Character.
     * Loads all images, applies gravity, and starts animations.
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

        this.walking_sound.volume = 0.6;
        this.jumping_sound.volume = 0.6;
        this.hurt_sound.volume = 0.6;
        this.dead_sound.volume = 0.6;
        this.coin_sound.volume = 0.6;
        this.bottle_sound.volume = 0.6;
        this.snoring_sound.volume = 0.6;
    }

    /**
     * Starts the animation intervals for the character.
     */
    animate() {
        setStoppableInterval(this.handleCharacterMovement.bind(this), 1000 / 60);
        setStoppableInterval(this.handleCharacterJumpingAnimation.bind(this), 150);
        setStoppableInterval(this.handleCharacterAnimation.bind(this), 50);
        setStoppableInterval(this.handleIdleAnimation.bind(this), 240);
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    handleCharacterMovement() {
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
     * Handles the idle animation of the character.
     */
    handleIdleAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.X && !this.isHurt()) {
            if (this.idleTime < 5) {
                this.idleTime++;
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE_LONG);
                if (!mute && this.snoring_sound.readyState == 4) {
                    this.snoring_sound.play();
                } else {
                    this.snoring_sound.pause();
                    this.snoring_sound.currentTime = 0;
                }
            }
        } else {
            this.snoring_sound.pause(); // Stops the snoring sound when idle ends
            this.snoring_sound.currentTime = 0; // Resets the snoring sound
        }
    }

    /**
     * Handles the animation of the character based on its state (e.g., walking, hurt, dead).
     */
    handleCharacterAnimation() {
        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            gameOver();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            if (mute == false && this.hurt_sound.readyState == 4) {
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
     * Handles the jumping animation of the character.
     */
    handleCharacterJumpingAnimation() {
        if (this.isAboveGround()) {
    
            if (!this.isJumpingAnimationPlaying) {
                this.isJumpingAnimationPlaying = true;
                this.currentImage = 0;
            }

            const i = this.currentImage % this.IMAGES_JUMPING.length;
            const path = this.IMAGES_JUMPING[i];
            this.img = this.imageCache[path];
            this.currentImage++;

        } else {
         
            this.isJumpingAnimationPlaying = false;
            this.currentImage = 0;
        }
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the character can move right, otherwise false.
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
        if (this.y > 158 && !mute && this.walking_sound.readyState == 4) {
            this.walking_sound.play();
        }
       if (this.y > 158 && !mute) {
        if (!this.walkingPlaying) {
            this.walking_sound.currentTime = 0;
            this.walking_sound.play();
            this.walkingPlaying = true;
        }
    }
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the character can move left, otherwise false.
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

    // Erster Play-Check wie bei moveRight
    if (this.y > 158 && !mute && this.walking_sound.readyState == 4) {
        this.walking_sound.play();
    }

    // Zweiter Play-Check mit walkingPlaying
    if (this.y > 158 && !mute) {
        if (!this.walkingPlaying) {
            this.walking_sound.currentTime = 0;
            this.walking_sound.play();
            this.walkingPlaying = true;
        }
    }
}

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, otherwise false.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump.
     */
jump() {
  if (!mute) {
    this.jumping_sound.currentTime = 0;
    this.jumping_sound.play();
  }
  this.speedY = 30;
}
    /**
     * Collects coins and plays the coin collection sound.
     */
collectCoins() {
  if (!mute) {
    this.coin_sound.currentTime = 0;
    this.coin_sound.play();
  }

  this.coins += 10;
  if (this.coins >= 100) {
    this.buyLife();
  }
}

    /**
     * Buys a life for the character by resetting energy and coins.
     */
    buyLife() {
        this.energy = 100;
        this.world.healthBar.setPercentage(this.energy);
        this.coins = 0;
    }

    /**
     * Collects bottles and plays the bottle collection sound.
     */
    collectBottles() {
        if (!mute) {
            this.bottle_sound.currentTime = 0;
            this.bottle_sound.play();
        }
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Reduces the number of bottles the character has.
     */
    reduceBottlesAmount() {
        this.bottles -= 20;
    }
}
