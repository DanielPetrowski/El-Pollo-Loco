/**
 * Displays the bottle collection progress in the game.
 * Inherits all bar functionality from the Bar class.
 * @class
 */
class BottleBar extends Bar {
    /**
     * Vertical position of the bottle bar on the screen.
     * @type {number}
     */
    y = 90;

    /**
     * List of image paths representing the visual states of the bottle bar at different collection levels.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Initializes a new BottleBar instance.
     * Loads the bar images and sets the starting percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}
