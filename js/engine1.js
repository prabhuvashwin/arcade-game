
var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 707;
    canvas.height = 707;
    doc.body.appendChild(canvas);


    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;


        update(dt);
        render();


        lastTime = now;


        win.requestAnimationFrame(main);
    }


    function init() {
        //reset();
        lastTime = Date.now();
        main();
    }


    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }


    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }


    function render() {

        var rowImages = [
                'img/water-block.png',   // Top row is water
                'img/stone-block.png',   // Row 1 of 3 of stone
                'img/stone-block.png',   // Row 2 of 3 of stone
                'img/stone-block.png',   // Row 3 of 3 of stone
                'img/grass-block.png',   // Row 1 of 2 of grass
                'img/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = 7,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)


        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }


    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        allGems.forEach(function(gem) {
            gem.render();
        });

        stats.render();
    }

    function checkCollisions() {
        function collision(a, b) {
            return (a.x < b.x + b.width) && (a.x + a.width > b.x)
                    && (a.y < b.y + b.height) && (a.y + a.height > b.y);
        }

        allEnemies.forEach(function(enemy) {
            if (collision(player, enemy)) {
                player.hit();

                return player.lives > 1 ? player.updateLives('remove', 1) : reset();
            }
        });

        allGems.forEach(function(gem) {
            if (collision(player, gem)) {
                gem.clear();
                stats.updateGems();

            }
        });

        if (player.y == 70) {
            updateLevel();
        }
    }


    function updateLevel() {
        level.update();
    }

    function reset() {
        level.reset();
    }


    Resources.load([
        'img/stone-block.png',
        'img/water-block.png',
        'img/grass-block.png',
        'img/enemy-bug.png',
        'img/char-boy.png'
    ]);
    Resources.onReady(init);


    global.ctx = ctx;
})(this);
