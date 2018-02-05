/**
 * Gem class is used to define the different gems, their position,
 * dimensions, and type.
 */
class Gem {

    /**
     * constructor - defines the image of the gem, width and height of the gem,
     * and the position of the gem
     *
     * @param  {Number} positionX x-axis position of the gem
     * @param  {Number} positionY y-axis position of the gem
     */
    constructor(positionX, positionY) {
        const gemArray = ['img/gem-blue.png', 'img/gem-orange.png', 'img/gem-green.png'];
        this.sprite = gemArray[Helper.getRandomInt(0, 2)];
        this.height = Helper.entityHeight;
        this.width = Helper.entityWidth;
        this.x = positionX;
        this.y = positionY;
    }


    /**
     * render - renders the gem object on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    /**
     * clear - Removes the gem object from the screen.
     * Also plays a sound notification to notify the removal
     */
    clear() {
        this.x = -100;
        gemCollect.play();
    }


    /**
     * @static spawn - spawns a number of gems to different position,
     * and on different rows. The number of gems to spawn is decided by
     * the num paramter passed. The new gems generated are pushed into
     * allGems array
     *
     * @param  {Number} num  number of gems to spawn
     */
    static spawn(num) {
        for (let i = 0; i < num; i++) {
            allGems.push(new Gem(Helper.positionX[Helper.getRandomInt(0, 6)],
                                 Helper.positionY[Helper.getRandomInt(0, 3)]));
        }
    }


    /**
     * @static reset - Sets the allGems array to an empty array
     *
     * @returns {type}  description
     */
    static reset() {
        allGems = [];
    }
};

let allGems = [];
