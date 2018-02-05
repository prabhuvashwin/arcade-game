/**
 * Player class defines the properties of the player
 */
class Player {

    /**
     * constructor - will set the image of the player, start position,
     * width and height, number of lives at the beginning
     *
     * @returns {type}  description
     */
    constructor() {
        this.sprite = 'img/char-boy.png';
        this.setPlayerStartPosition();
        this.height = Helper.entityHeight;
        this.width = Helper.entityWidth;
        this.lives = 3;
    }

    /**
     * update - keeps track of the current position of the player.
     * Is used to move the player in the respective direction when
     * one of the arrow keys is pressed
     */
    update() {
        this.xNow = this.x;
        this.yNow = this.y;
    }

    /**
     * setPlayerStartPosition - Set the player position to the
     * start position defined in the helper class
     */
    setPlayerStartPosition() {
        this.x = Helper.playerStartPositionX;
        this.y = Helper.playerStartPositionY;
    }

    /**
     * reset - Resets the player position and lives according to the
     * current level. If the level is 1, then the lives is reset back to 3.
     * Else, on the start position is reset.
     *
     * @param  {Number} level  current level
     */
    reset(level) {
        this.setPlayerStartPosition();
        if (level === 1) {
            this.lives = 3;
        }
    }

    /**
     * hit - If the player is hit then the start position is reset
     * and a sound is played. A red color fades out of the screen to
     * display the hit
     */
    hit() {
        this.setPlayerStartPosition();
        $('.collision').show().fadeOut();
        playerHit.play();
    }

    /**
     * render - draws the player image at the position on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * updateLives - updates lives based on the input passed.
     * action will specify whether to add or remove lives.
     * value is the number of lives to add or remove. stats are
     * updated accordingly
     *
     * @param  {String} action 'add' or 'remove'
     * @param  {Number} value  lives to add
     */
    updateLives(action, value) {
        if (action === 'add') {
            this.lives += value;
        }
        if (action === 'remove') {
            this.lives -= value;
        }

        stat.updateLives(this.lives);
    }

    /**
     * handleInput - used to navigate player across the screen.
     *
     * @param  {String} key  'left', 'up', 'down', 'right' based
     * on the key pressed
     */
    handleInput(key) {
        console.log(key);
        if (key === 'left' && this.x != Helper.leftBoundary) {
            this.x = this.xNow + -(Helper.playerMovement);
        }
        if (key === 'up' && this.y != Helper.topBoundary) {
            this.y = this.yNow + -(Helper.playerMovement);
        }
        if (key === 'right' && this.x != Helper.rightBoundary) {
            this.x = this.xNow + (Helper.playerMovement);
        }
        if (key === 'down' && this.y != Helper.downBoundary) {
            this.y = this.yNow + (Helper.playerMovement);
        }
    }
}

let player = new Player();
