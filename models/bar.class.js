/**
 * Represents a bar in the game (e.g., health bar, energy bar).
 * Inherits drawable capabilities from the DrawableObject class.
 * @class
 */
class Bar extends DrawableObject {
    /**
     * X-coordinate of the bar.
     * @type {number}
     */
    x = 0;

    /**
     * Y-coordinate of the bar.
     * @type {number}
     */
    y = -3;

    /**
     * Height of the bar in pixels.
     * @type {number}
     */
    height = 60;

    /**
     * Width of the bar in pixels.
     * @type {number}
     */
    width = 200;

    /**
     * Current percentage value of the bar (e.g., health or energy percentage).
     * @type {number}
     */
    percentage;

    /**
     * Array of image paths representing different visual states of the bar.
     * @type {string[]}
     */
    IMAGES = [];

    /**
     * Creates a new Bar instance.
     */
    constructor() {
        super();
    }

    /**
     * Updates the bar's percentage value and refreshes the displayed image.
     * @param {number} percentage - Percentage value to set (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the current percentage.
     * @returns {number} Index of the image corresponding to the current percentage.
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
