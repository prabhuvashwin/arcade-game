/**
 * Level class defines the level of the game and its properties
 */
class Level {

    /**
     * constructor - will set the level to 1 and call
     * setLevelSettings() method to set other propeties like
     * gems, enemies, player.
     */
    constructor() {
        this.level = 1;
        this.setLevelSettings(this.level);
    }

    /**
     * update - increases the level by one, and updates the level
     * for stat board. Will also call setLevelSettings() method to
     * reset the gem, enemy, and playes according to the level
     */
    update() {
        this.level++;
        this.setLevelSettings(this.level);
        stat.updateLevel(this.level);
        stat.updateScore();
        levelUp.play();
    }

    /**
     * setLevelSettings - resets the gem, enemy and player objects.
     * If the level is 1, 2, or 3 - then 2 to 4 enemies will be spawn
     * and 0 to 2 gems will be spawn
     * If the level is 4, 5, or 6 - then 4 to 6 enemies will be spawn
     * and 2 to 3 gems will be spawn
     * Any level above 6 - then 8 to 12 enemies will be spawn and 5 to 6
     * gems will be spawn
     * @param   {Number} level current level
     */
    setLevelSettings(level) {
        Gem.reset();
        Enemy.reset();
        player.reset(level);
        switch (level) {
            case 1:
            case 2:
            case 3:
                Enemy.spawn(Helper.getRandomInt(2, 4));
                Gem.spawn(Helper.getRandomInt(0, 2));
                break;
            case 4:
            case 5:
            case 6:
                Enemy.spawn(Helper.getRandomInt(4, 6));
                Gem.spawn(Helper.getRandomInt(2, 3));
                break;
            default:
                Enemy.spawn(Helper.getRandomInt(8, 12));
                Gem.spawn(Helper.getRandomInt(5, 6));
                break;
        }
    }

    /**
     * reset - level is reset to 1. setLevelSettings() method is called
     * and the new level value is passed. stat board is reset.
     */
    reset() {
        this.level = 1;
        this.setLevelSettings(this.level);
        stat.reset(this.level);
        paused = true;
    }
}

let level = new Level();
