/**
 * Main music which will be played through out the game
 */
const gameMusic = new Howl({
    src: ['sounds/game-music.mp3'],
    loop: true
});

/**
 * Sound played when the game ends
 */
const gameOver = new Howl({
    src: ['sounds/gong.mp3']
});

/**
 * Sound played when the level is increased
 */
const levelUp = new Howl({
    src: ['sounds/points.mp3']
});

/**
 * Sound played when a gem is collected
 */
const gemCollect = new Howl({
    src: ['sounds/gem.mp3']
});

/**
 * Sound played when a player hits an enemy
 */
const playerHit = new Howl({
    src: ['sounds/punch.mp3']
});

/**
 * Sound played when a button is pressed
 */
const gameSelect = new Howl({
    src: ['sounds/blop.mp3']
});
