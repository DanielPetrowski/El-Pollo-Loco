/**
 * Represents the lifebar of the end boss in the game.
 * @class
 * @extends Bar
 */
class EndbossLifebar extends Bar {
    x = 100;
    y = 70;
    height = 40;
    width = 160;

    /**
     * Array of image paths representing different states of the end boss lifebar.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    /**
     * Creates a new instance of the EndbossLifebar.
     * @param {number} x - The initial x-coordinate of the lifebar.
     */
    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = x + 50;
    }

    /**
     * Updates the position of the lifebar based on the new x-coordinate.
     * @param {number} newX - The new x-coordinate for the lifebar.
     */
    moveLifebar(newX) {
        this.x = newX + 50;
    }
}