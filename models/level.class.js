/**
 * Represents a game level, including its enemies, collectibles, environment, and the end boss.
 * @class
 */
class Level {
    /**
     * The end boss of this level.
     * @type {MovableObject}
     */
    endboss;

    /**
     * All enemies present in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * Cloud objects used in the level's background.
     * @type {MovableObject[]}
     */
    clouds;

    /**
     * Background elements such as scenery or decorative objects.
     * @type {MovableObject[]}
     */
    backgroundObjects;

    /**
     * Collectible or interactive bottle objects in the level.
     * @type {MovableObject[]}
     */
    bottles;

    /**
     * Collectible coin objects in the level.
     * @type {MovableObject[]}
     */
    coins;

    /**
     * The status bar representing player health or other indicators.
     * @type {Bar}
     */
    statusBar;

    /**
     * The x-coordinate at which the level ends.
     * @type {number}
     */
    level_end_x = 2000;

    /**
     * Initializes a new Level instance with its components.
     * @param {MovableObject} endboss - The end boss of the level.
     * @param {MovableObject[]} enemies - Array of enemies in the level.
     * @param {MovableObject[]} clouds - Array of cloud objects for the background.
     * @param {MovableObject[]} backgroundObjects - Array of background elements.
     * @param {MovableObject[]} bottles - Array of bottles in the level.
     * @param {MovableObject[]} coins - Array of coins in the level.
     * @param {Bar} statusBar - The status bar associated with this level.
     */
    constructor(endboss, enemies, clouds, backgroundObjects, bottles, coins, statusBar) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.statusBar = statusBar; 
    }
}
