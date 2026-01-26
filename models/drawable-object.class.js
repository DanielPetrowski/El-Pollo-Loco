/**
 * Represents a drawable object in the game, such as characters, items, or backgrounds.
 * @class
 */
class DrawableObject {
    /**
     * The x-coordinate of the object on the canvas.
     * @type {number}
     */
    x = 120;

    /**
     * The y-coordinate of the object on the canvas.
     * @type {number}
     */
    y = 160;

    /**
     * The image to be drawn.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * A cache for preloaded images.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * The index of the current image in an animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Tracks whether a warning for the current image has already been shown.
     * @type {boolean}
     */
    imageWarningShown = false;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => {
            console.log('Image loaded:', path);
        };
    }

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.img instanceof HTMLImageElement && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Preloads multiple images and stores them in the image cache.
     * @param {string[]} arr - An array of image paths to preload.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}