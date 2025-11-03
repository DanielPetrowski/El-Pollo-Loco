/**
 * Represents the health bar of the end boss in the game.
 * @class
 * @extends Bar
 */
class EndbossHealthBar extends Bar {
    x = 100;
    y = 70;
    height = 40;
    width = 160;

    /**
     * A collection of image paths showing different health levels of the end boss.
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
     * Initializes a new EndbossHealthBar instance.
     * Loads the health bar images and sets the initial position and percentage.
     * @param {number} x - The starting x-coordinate for the lifebar.
     */
    constructor(x) {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = x + 50;
    }

    /**
     * Updates the horizontal position of the lifebar relative to the end boss.
     * @param {number} newX - The updated x-coordinate of the lifebar.
     */
    moveHealthbar(newX) {
        this.x = newX + 50;
    }
}
