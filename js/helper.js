/**
 * Helper class holds some constants which are used throughout
 * the application.
 */
class Helper {

    /**
     * @static get - returns the font
     */
    static get font() {
        return '20pt Pixel Miners';
    }

    /**
     * @static get - returns the font color
     */
    static get fontColor() {
        return '#ff0';
    }

    /**
     * @static get - returns the entity height. An entity can
     * be enemy, player or gems
     */
    static get entityHeight() {
        return 50;
    }

    /**
     * @static get - returns the entity width. An entity can
     * be enemy, player or gems
     */
    static get entityWidth() {
        return 50;
    }

    /**
     * @static get - returns the minimum speed of the enemy
     */
    static get minimumSpeed() {
        return 5;
    }

    /**
     * @static get - returns the maximum speed of the enemy
     */
    static get maximumSpeed() {
        return 15;
    }

    /**
     * @static get - returns the start position x-axis of the player
     */
    static get playerStartPositionX() {
        return 300;
    }

    /**
     * @static get - returns the start position y-axis of the player
     */
    static get playerStartPositionY() {
        return 470;
    }

    /**
     * @static get - returns the minimum speed of the enemy
     */
    static get playerMovement() {
        return 50;
    }

    /**
     * @static get - returns an array of positions at x-axis which any
     * entity can hold
     */
    static get positionX() {
        return [0, 100, 200, 300, 400, 500, 600];
    }

    /**
     * @static get - returns an array of positions at y-axis which any
     * entity can hold
     */
    static get positionY() {
        return [130, 220, 310, 390];
    }

    /**
     * @static get - returns the left boundary threshold
     */
    static get leftBoundary() {
        return 0;
    }

    /**
     * @static get - returns the top boundary threshold
     */
    static get topBoundary() {
        return 20;
    }

    /**
     * @static get - returns the right boundary threshold
     */
    static get rightBoundary() {
        return 600;
    }

    /**
     * @static get - returns the down boundary threshold
     */
    static get downBoundary() {
        return 470;
    }

    /**
     * @static get - returns the random integer between minimum
     * and maximum value specified
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
