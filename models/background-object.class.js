/**
 * Represents a background object in the game.
 * Inherits movement capabilities from the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
     * Width of the background object in pixels.
     * @type {number}
     */
    width = 720;

    /**
     * Height of the background object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - Path to the image file for the background object.
     * @param {number} x - X-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Position the object at the bottom of the canvas.
    }

    
}
