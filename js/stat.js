/**
 * Stat class maintains the stat board
 */
class Stat {

    /**
     * constructor - sets the font, font color, level, lives,
     * score, gems collected
     *
     * @param  {Number} level current level
     * @param  {Number} lives number of lives
     */
    constructor(level, lives) {
        this.font = Helper.font;
		this.fontColor = Helper.fontColor;
		this.currentLevel = level;
		this.currentLives = lives;
		this.currentScore = 0;
		this.currentGems = 0;
    }

    /**
     * render - draws the stat board at the top of the canvas
     */
    render() {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fillRect(0,50, 707, 45);
		this.level();
		this.score();
		this.lives();
		this.gems();
    }

    /**
     * level - draws the level column at the top of the canvas
     */
    level() {
        ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('Level '+ this.currentLevel, 10, 82);
    }

    /**
     * updateLevel - updates the currentLevel with the latest
     * level value
     *
     * @param  {Number} level latest level value
     */
    updateLevel(level) {
        this.currentLevel = level;
    }

    /**
     * score - draws the score column at the top of the canvas
     */
    score() {
        ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'end';
		ctx.fillText(this.currentScore, 700, 82);
    }

    /**
     * updateScore - updates the current score by adding
     * 600 to the current score
     */
    updateScore() {
        this.currentScore = this.currentScore + 600;
    }

    /**
     * lives - draws the lives column at the top of the canvas
     */
    lives() {
		ctx.drawImage(Resources.get('img/stat-heart.png'), 430, 62);
		ctx.font = this.font;
		ctx.fontStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('x '+ this.currentLives, 465, 82);
    }

    /**
     * updateLives - updates the current lives to the lives
     * passed
     *
     * @param  {Number} lives  latest lives value
     */
    updateLives(lives) {
		this.currentLives = lives;
    }

    /**
     * gems - draws the gem column at the top of the canvas
     */
    gems() {
		ctx.drawImage(Resources.get('img/stat-gem.png'), 340, 62);
		ctx.font = this.font;
		ctx.fontStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('x '+ this.currentGems, 370, 82);
    }

    /**
     * updateGems - updates the current gems. Adds 300 to
     * current score
     */
    updateGems() {
		this.currentGems++;
		this.currentScore = this.currentScore + 300;
    }


    /**
     * reset - Displays the game over page with the final score
     * and a play again option. Resets current score, gems collected,
     * current level, current lives
     *
     * @param  {Number} level  current level
     */
    reset(level) {
		$("#score").html(this.currentScore);
		this.currentScore = 0;
		this.currentGems = 0;
		this.currentLevel = level;
        this.currentLives = player.lives;
    }
};

let stat = new Stat(level.level, player.lives);
