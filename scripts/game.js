let canvas;
let world;
let keyboard;
let gameStart = false;
let infoScreenOn = false;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    world.pauseGame();
}

function fullscreen() {
    let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    let fullscreenElem = document.getElementById("fullscreen");
    let canvas = document.getElementById("canvas");
    let button = document.getElementById("buttonFullscreen");

    if (isFullscreen) {
        closeFullscreen();
        canvas.style.width = '';
        canvas.style.height = '';
        button.innerText = '⛶';
    } else {
        openFullscreen(fullscreenElem);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        button.innerText = '🗗';
    }
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Mozilla */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Mozilla */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function startGame() {
    gameStart = true;
    world.resumeGame();
    document.getElementById('mainDiv').style.display = 'none';
    document.getElementById('backgroundStart').style.display = 'none';
}

function infoScreen() {
    if (infoScreenOn) {
        // ausschalten
        document.getElementById('infoScreen').style.display = 'none';
        infoScreenOn = false;
        if (world.isPaused && gameStart) {
            world.isPaused = false;
        }
        if (!gameStart) {
            document.getElementById('mainDiv').style.display = '';
            document.getElementById('backgroundStart').style.display = '';
        }
    } else {
        // einschalten
        infoScreenOn = true;
        world.isPaused = true;
        document.getElementById('infoScreen').style.display = '';
        if (!gameStart) {
            document.getElementById('mainDiv').style.display = 'none';
            document.getElementById('backgroundStart').style.display = 'none';
        }
    }
}

function gameOverScreen() {
    setTimeout(() => {
        document.getElementById('backgroundGameOver').style.display = '';

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').style.display = '';
        document.getElementById('footerWalkbuttonDiv').style.display = 'none';
        document.getElementById('footerAttackbuttonDiv').style.display = 'none';
        document.getElementById('buttonInfo').style.display = 'none';
        document.getElementById('buttonFullscreen').style.display = 'none';

        world.pauseGame();
    }, 2500);
}

function winScreen() {
    setTimeout(() => {
        document.getElementById('backgroundWin').style.display = '';

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').style.display = '';
        document.getElementById('footerWalkbuttonDiv').style.display = 'none';
        document.getElementById('footerAttackbuttonDiv').style.display = 'none';
        document.getElementById('buttonInfo').style.display = 'none';
        document.getElementById('buttonFullscreen').style.display = 'none';

        world.pauseGame();
    }, 2500);
}

function resetGame() {
    document.getElementById('backgroundWin').style.display = 'none';
    document.getElementById('backgroundGameOver').style.display = 'none';
    document.getElementById('uiBackgroundSection').classList.remove('background_color');
    document.getElementById('footerResetbuttonDiv').style.display = 'none';
    document.getElementById('buttonInfo').style.display = '';
    document.getElementById('buttonFullscreen').style.display = '';
    document.getElementById('mainDiv').style.display = '';
    document.getElementById('backgroundStart').style.display = '';
    gameStart = false;
    infoScreenOn = false;
    world = null;
    init();
}