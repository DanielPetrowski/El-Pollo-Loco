/**
 * Represents a bar (e.g., health bar, energy bar) in the game.
 * Extends the DrawableObject class to inherit drawable functionality.
 * @class
 */
class Bar extends DrawableObject {
    /**
     * The x-coordinate of the bar.
     * @type {number}
     */
    x = 0;

    /**
     * The y-coordinate of the bar.
     * @type {number}
     */
    y = -3;

    /**
     * The height of the bar.
     * @type {number}
     */
    height = 60;

    /**
     * The width of the bar.
     * @type {number}
     */
    width = 200;

    /**
     * The current percentage value of the bar (e.g., health percentage).
     * @type {number}
     */
    percentage;

    /**
     * An array of image paths representing different states of the bar.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Creates a new Bar.
     */
    constructor() {
        super();
    }

    /**
     * Sets the percentage value of the bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage value.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }
}