/**
 * Represents a cloud in the game.
 * Extends the MovableObject class to inherit movement functionality.
 * @class
 */
class Cloud extends MovableObject {
    /**
     * The y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

     /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

   

    /**
     * Creates a new Cloud.
     * Loads the cloud image, sets a random x-coordinate, and starts the animation.
     * @param {string} imagePath - The path to the cloud image.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 300;
        this.animate();
    }

    /**
     * Animates the cloud by moving it continuously to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS
    }
}