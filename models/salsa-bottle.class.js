/**
 * Represents a salsa bottle in the game, which can be collected or interacted with.
 * @class
 * @extends MovableObject
 */
class SalsaBottle extends MovableObject {
    height = 80;
    width = 70;
    y = 350;

    /**
     * Array of image paths for the salsa bottle.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 10,
        left: 20,
        right: 30,
        bottom: 10
    };

    /**
     * Randomly selected image index for the salsa bottle.
     * @type {number}
     */
    randomImg;

    /**
     * Creates a new instance of a SalsaBottle.
     */
    constructor() {
        super();
        this.getRandomImg();
        if (this.randomImg === 0) {
            this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
        this.x = 300 + Math.random() * 1700;
    }

    /**
     * Generates a random index to select an image for the salsa bottle.
     */
    getRandomImg() {
        this.randomImg = Math.floor(Math.random() * 2);
    }
}