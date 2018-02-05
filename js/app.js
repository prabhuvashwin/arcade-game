let paused = true;

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

    $('#back-button').click(function() {
        $('.start-screen').fadeIn('fast');
        level.reset();
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
