const allEnemies = [];

const allGems = [];

let paused = true;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const APPLICATION_CONSTANTS = {
    FONT: '20pt Pixel Miners',
    FONT_COLOR: '#ff0',
    ENTITY_HEIGHT: 50,
    ENTITY_WIDTH: 50,
    MIN_SPEED: 5,
    MAX_SPEED: 20,
    PLAYER_START_X: 300,
    PLAYER_START_Y: 470,
    PLAYER_MOVEMENT: 50,
    POSITION_X: [0, 100, 200, 300, 400, 500, 600],
    POSITION_Y: [160, 230, 310, 390],
    LEFT_BOUNDARY: 0,
    TOP_BOUNDARY: 20,
    RIGHT_BOUNDARY: 600,
    BOTTOM_BOUNDARY: 470
};

$(document).ready(function() {
    gameMusic.volume(0.4);

    console.log("Started");

    $('.play-game').click(function() {
        console.log("Clicked");
        $('.start-screen').fadeOut('fast');
        gameMusic.fade(0.3, 0.7, 2000);
        paused = false;
    });

    $('.play-again').click(function() {
        $('.game-over').hide();
        gameSelect.play();
        gameMusic.fade(0.3, 1.0, 1000);
        paused = false;
    });

    $('#how-to-play').click(function() {
        console.log("how to play");
        gameSelect.play();
        gameMusic.fade(0.7, 0.3, 2000);

        $('.instructions-to-play').fadeIn('fast');
    });

    $('.instructions-to-play-close').click(function() {
        gameSelect.play();
        gameMusic.fade(0.3, 0.7, 2000);
        $('.instructions-to-play').fadeOut('fast');
        $('#how-to-play').show();
    });

    $('#header-music').on('click', function(event) {
        event.preventDefault();

        if (event.target.classList.contains('on')) {
            console.log('on');
            $(this).addClass('off').removeClass('on');
            $('#start-screen-music').addClass('off').removeClass('on');
            $(this).text('Music Off');
            $('#start-screen-music').text('Music Off');
            gameMusic.pause();
        } else if (event.target.classList.contains('off')) {
            console.log('off');
            $(this).addClass('on').removeClass('off');
            $('#start-screen-music').addClass('on').removeClass('off');
            $(this).text('Music On');
            $('#start-screen-music').text('Music On');
            gameMusic.play();
        }
    });

    $('#start-screen-music').on('click', function(event) {
        event.preventDefault();

        if (event.target.classList.contains('on')) {
            console.log('on');
            $(this).addClass('off').removeClass('on');
            $('#header-music').addClass('off').removeClass('on');
            $(this).text('Music Off');
            $('#header-music').text('Music Off');
            gameMusic.pause();
        } else if (event.target.classList.contains('off')) {
            console.log('off');
            $(this).addClass('on').removeClass('off');
            $('#header-music').addClass('on').removeClass('off');
            $(this).text('Music On');
            $('#header-music').text('Music On');
            gameMusic.play();
        }
    });

});

class Enemy {
    constructor(positionY, speed) {
        this.sprite = 'img/enemy-bug.png';
        this.x = getRandomInt(-1000, -100);
        this.y = positionY;
        this.height = APPLICATION_CONSTANTS.ENTITY_HEIGHT;
        this.width = APPLICATION_CONSTANTS.ENTITY_WIDTH;
        this.speed = speed;
    }

    update(dt) {
        this.x = this.x + this.speed + dt;
        if (this.x > canvas.width) {
            this.x = getRandomInt(-2000, -100);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Enemies {
    constructor() {
        this.enemiesArray = [];
    }

    spawn(num) {
        for (let i = 0; i < num; i++) {
            let speed = getRandomInt(APPLICATION_CONSTANTS.MIN_SPEED, APPLICATION_CONSTANTS.MAX_SPEED);
            var position = getRandomInt(0, 3);
            this.enemiesArray[allEnemies.length] = new Enemy(APPLICATION_CONSTANTS.POSITION_Y[position], speed);
            allEnemies.push(this.enemiesArray[allEnemies.length]);
        }
    }

    reset(allEnemies) {
        let enemyCount = allEnemies.length;

        for (var i = 0; i < enemyCount; i++) {
            allEnemies.splice(i, allEnemies.length);
        }
    }
};

let enemies = new Enemies();

class Gem {
    constructor(positionX, positionY) {
        const gemArray = ['img/gem-blue.png', 'img/gem-orange.png', 'img/gem-green.png'];
        this.sprite = gemArray[getRandomInt(0, 2)];
        this.height = APPLICATION_CONSTANTS.ENTITY_HEIGHT;
        this.width = APPLICATION_CONSTANTS.ENTITY_WIDTH;
        this.x = positionX;
        this.y = positionY;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    clear() {
        this.x = -100;
        gemCollect.play();
    }

    reset() {
        gem = new Gem();
    }
};

let gem = new Gem();

class Gems {
    constructor() {
        this.gemsArray = [];
    }

    spawn(num) {
        for (let i = 0; i < num; i++) {
            let positionX = getRandomInt(0, 6);
            let positionY = getRandomInt(0, 3);
            this.gemsArray[allGems.length] = new Gem(APPLICATION_CONSTANTS.POSITION_X[positionX],
                                                    APPLICATION_CONSTANTS.POSITION_Y[positionY]);
            allGems.push(this.gemsArray[allGems.length]);
        }
    }

    reset() {
        let gemsCount = allGems.length;
        for (var i = 0; i < gemsCount; i++) {
            allGems.splice(i, allGems.length);
        }
    }
};

let gems = new Gems();

class Player {
    constructor() {
        this.sprite = 'img/char-boy.png';
        this.x = APPLICATION_CONSTANTS.PLAYER_START_X;
        this.y = APPLICATION_CONSTANTS.PLAYER_START_Y;
        this.height = APPLICATION_CONSTANTS.ENTITY_HEIGHT;
        this.width = APPLICATION_CONSTANTS.ENTITY_WIDTH;
        this.lives = 3;
    }

    update() {
        this.xNow = this.x;
        this.yNow = this.y;
    }

    reset() {
        this.x = APPLICATION_CONSTANTS.PLAYER_START_X;
        this.y = APPLICATION_CONSTANTS.PLAYER_START_Y;
    }

    hit() {
        this.x = APPLICATION_CONSTANTS.PLAYER_START_X;
        this.y = APPLICATION_CONSTANTS.PLAYER_START_Y;
        $('.collision').show().fadeOut();
        playerHit.play();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    updateLives(action, value) {
        if (action === 'add') {
            this.lives += value;
        }
        if (action === 'remove') {
            this.lives -= value;
        }

        stat.updateLives(this.lives);
    }

    handleInput(key) {
        console.log(key);
        if (key === 'left' && this.x != APPLICATION_CONSTANTS.LEFT_BOUNDARY) {
            this.x = this.xNow + -(APPLICATION_CONSTANTS.PLAYER_MOVEMENT);
        }
        if (key === 'up' && this.y != APPLICATION_CONSTANTS.TOP_BOUNDARY) {
            this.y = this.yNow + -(APPLICATION_CONSTANTS.PLAYER_MOVEMENT);
        }
        if (key === 'right' && this.x != APPLICATION_CONSTANTS.RIGHT_BOUNDARY) {
            this.x = this.xNow + (APPLICATION_CONSTANTS.PLAYER_MOVEMENT);
        }
        if (key === 'down' && this.y != APPLICATION_CONSTANTS.BOTTOM_BOUNDARY) {
            this.y = this.yNow + (APPLICATION_CONSTANTS.PLAYER_MOVEMENT);
        }
    }
}

let player = new Player();

class Level {
    constructor() {
        this.level = 1;
        enemies.spawn(2);
        gems.spawn(2);
    }

    update() {
        this.level++;
        if (this.level % 2)
            enemies.spawn(1);
        gems.reset();
        gems.spawn(getRandomInt(2, 4));
        player.reset();
        stat.updateLevel(this.level);
        stat.updateScore();
        levelUp.play();
    }

    reset() {
        this.level = 1;
        player.reset();
        enemies.reset();
        gem.reset();
        stat.reset();
        player.updateLives('add', 2);
        enemies.spawn(2);
        gameOver.play();
        gameMusic.fade(1.0, 0.3, 1000);
        paused = true;
        $('game-over').show();
    }
}

let level = new Level();


class Stat {
    constructor() {
        this.font = APPLICATION_CONSTANTS.FONT;
		this.fontColor = APPLICATION_CONSTANTS.FONT_COLOR;
		this.currentLevel = level.level;
		this.currentLives = player.lives;
		this.currentScore = 0;
		this.currentGems = 0;
    }

    render() {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fillRect(0,50, 707, 45);
		this.level();
		this.score();
		this.lives();
		this.gems();
    }

    level() {
        ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('Level '+ this.currentLevel, 10, 82);
    }

    updateLevel() {
        this.currentLevel = level;
    }

    score() {
        ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'end';
		ctx.fillText(this.currentScore, 700, 82);
    }

    updateScore() {
        this.currentScore = this.currentScore + 600;
    }

    lives() {
		ctx.drawImage(Resources.get('img/stat-heart.png'), 430, 62);
		ctx.font = this.font;
		ctx.fontStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('x '+ this.currentLives, 465, 82);
    }

    updateLives(lives) {
		this.currentLives = lives;
    }

    gems() {
		ctx.drawImage(Resources.get('img/stat-gem.png'), 340, 62);
		ctx.font = this.font;
		ctx.fontStyle = this.fontColor;
		ctx.textAlign = 'start';
		ctx.fillText('x '+ this.currentGems, 370, 82);
    }

    updateGems() {
		this.currentGems++;
		this.currentScore = this.currentScore + 300;
    }

    reset() {
		$(".game-over .score").html(this.currentScore);
		this.currentScore = 0;
		this.currentGems = 0;
		this.currentLevel = level.level;
    }
};

let stat = new Stat();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (!paused) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
