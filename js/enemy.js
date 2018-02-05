/**
 * Enemy class is used to define the enemy bugs, their position,
 * dimensions, and the speed at which they run.
 */
class Enemy {

    /**
     * constructor - Sets the initial parameters of the enemy
     * sprite is the image of the enemy
     * x is the start x-axis position of the enemy
     * y is the start y-axis position of the enemy
     * height is the enemy height
     * width is the enemy width
     * speed is the pace at which enemy runs
     *
     * @param  {Number} positionY     start y-axis position is passed
     *                                when creating the enemy object
     * @param  {Number} speed         the pace of the enemy is passed
     *                                when creating the enemy object
     */
    constructor(positionY, speed) {
        this.sprite = 'img/enemy-bug.png';
        this.x = Helper.getRandomInt(-1000, -100);
        this.y = positionY;
        this.height = Helper.entityHeight;
        this.width = Helper.entityWidth;
        this.speed = speed;
    }


    /**
     * update - Updates the position of the enemy as per the time delta
     * passed as a parameter. if the position goes out of the window then
     * it is reset
     *
     * @param  {Date} dt  time delta value
     */
    update(dt) {
        this.x = this.x + this.speed + dt;
        if (this.x > canvas.width) {
            this.x = Helper.getRandomInt(-2000, -100);
        }
    }


    /**
     * render - draws the image of the enemy on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    /**
     * @static spawn - spawns a number of enemies to different position,
     * and on different rows, running at different speeds. The number of
     * enemies to spawn is decided by the num paramter passed. The new enemies
     * generated are pushed into allEnemies array
     *
     * @param  {Number} num  number of enemies to spawn
     */
    static spawn(num) {
        for (let i = 0; i < num; i++) {
            let speed = Helper.getRandomInt(Helper.minimumSpeed, Helper.maximumSpeed);
            let position = Helper.getRandomInt(0, 3);
            allEnemies.push(new Enemy(Helper.positionY[position], speed));
        }
    }


    /**
     * @static reset - Sets the allEnemies array to an empty array
     */
    static reset() {
        allEnemies = [];
    }
};

let allEnemies = [];
