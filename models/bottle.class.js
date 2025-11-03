/**
 * Represents a collectible salsa bottle in the game that players can pick up or interact with.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    height = 80;
    width = 70;
    y = 350;

    /**
     * List of image paths used to display the salsa bottle.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Collision offset values for detecting interactions with the bottle.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 10,
        left: 20,
        right: 30,
        bottom: 10
    };

    /**
     * Index of the randomly selected image to display for this bottle.
     * @type {number}
     */
    randomImg;

    /**
     * Creates a new Bottle instance, randomly selecting its image and setting a random horizontal position.
     */
    constructor() {
        super();
        this.getImage();
        if (this.randomImg === 0) {
            this.loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        } else {
            this.loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        }
        this.x = 300 + Math.random() * 1700;
    }

    /**
     * Randomly selects an image index for the salsa bottle.
     */
    getImage() {
        this.randomImg = Math.floor(Math.random() * 2);
    }
}
