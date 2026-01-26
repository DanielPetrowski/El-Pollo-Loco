/**
 * Represents a level in the game, including its components such as enemies, objects, and the end boss.
 * @class
 */
class Level {
    /**
     * The end boss of the level.
     * @type {MovableObject}
     */
    endboss;

    /**
     * The enemies in the level.
     * @type {MovableObject[]}
     */
    enemies;

    /**
     * The clouds in the level.
     * @type {MovableObject[]}
     */
    clouds;

    /**
     * The background objects in the level.
     * @type {MovableObject[]}
     */
    backgroundObjects;

    /**
     * The bottles in the level.
     * @type {MovableObject[]}
     */
    bottles;

    /**
     * The coins in the level.
     * @type {MovableObject[]}
     */
    coins;

    /**
     * The status bar of the level.
     * @type {Bar}
     */
    statusBar;

    /**
     * The x-coordinate where the level ends.
     * @type {number}
     */
    level_end_x = 2000;

    /**
     * Creates a new instance of a Level.
     * @param {MovableObject} endboss - The end boss of the level.
     * @param {MovableObject[]} enemies - The enemies in the level.
     * @param {MovableObject[]} clouds - The clouds in the level.
     * @param {MovableObject[]} backgroundObjects - The background objects in the level.
     * @param {MovableObject[]} bottles - The bottles in the level.
     * @param {MovableObject[]} coins - The coins in the level.
     * @param {Bar} statusBar - The status bar of the level.
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