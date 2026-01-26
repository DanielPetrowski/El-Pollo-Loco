/**
 * Represents a coin in the game that the player can collect.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 100;
    width = 100;

    /**
     * Array of image paths for the coin animation.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Offset values for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 30,
        left: 30,
        right: 60,
        bottom: 60
    };

    /**
     * Creates a new instance of a Coin.
     */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 200 + Math.random() * 1700;
        this.y = 165 + Math.random() * 75;
        this.animate();
    }

    /**
     * Animates the coin by cycling through its images.
     */
    animate() {
        setStoppableInterval(() => {
            let i = this.currentImage % this.BOTTLE_IMAGES.length;
            let path = this.BOTTLE_IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 300);
    }
}