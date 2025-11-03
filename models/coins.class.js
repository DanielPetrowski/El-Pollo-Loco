/**
 * Represents a collectible coin in the game.
 * Extends MovableObject to inherit movement capabilities.
 * @class
 */
class Coin extends MovableObject {
    height = 100;
    width = 100;

    /**
     * List of image paths used for the coin's animation frames.
     * @type {string[]}
     */
    BOTTLE_IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    /**
     * Collision detection offsets for each side of the coin.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 30,
        left: 30,
        right: 60,
        bottom: 60
    };

    /**
     * Creates a new Coin object.
     * Loads images, sets a random position, and starts the animation.
     */
    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.x = 200 + Math.random() * 1700;
        this.y = 165 + Math.random() * 75;
        this.animate();
    }

    /**
     * Cycles through the coin images to create an animation effect.
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
