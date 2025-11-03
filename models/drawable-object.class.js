/**
 * Represents any object in the game that can be drawn on the canvas,
 * including characters, items, or background elements.
 * @class
 */
class DrawableObject {
    x = 120;
    y = 160;

    /**
     * The image currently displayed for this object.
     * @type {HTMLImageElement}
     */
    img;

    width = 100;
    height = 150;

    /**
     * Stores preloaded images to improve performance.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Tracks the index of the current frame in an animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads a single image from the specified file path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws this object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads a set of images and stores them in the object's cache for later use.
     * @param {string[]} arr - An array containing the paths of images to preload.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
