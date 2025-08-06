let canvas;
let world;
let keyboard;
let gameStart = false;
let infoScreenOn = false;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    level1 = getFreshLevel1();
    world = new World(canvas, keyboard);
    displayWarning();
    world.pauseGame();
}

function displayWarning() {
    setInterval(() => {
        if (window.innerWidth < window.innerHeight) {
            document.getElementById('displayPositionWarning').classList.remove('hide');
        } else {
            document.getElementById('displayPositionWarning').classList.add('hide');
        }
    }, 250);
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
    document.getElementById('mainDiv').classList.add('hide');
    document.getElementById('backgroundStart').classList.add('hide');
    if (window.innerWidth < 920 || window.innerHeight < 480) {
        document.getElementById('footerWalkbuttonDiv').classList.remove('hide');
        document.getElementById('footerAttackbuttonDiv').classList.remove('hide');
    }
}

function infoScreen() {
    if (infoScreenOn) {
        // ausschalten
        document.getElementById('infoScreen').classList.add('hide');
        infoScreenOn = false;
        if (world.isPaused && gameStart) {
            world.isPaused = false;
        }
        if (!gameStart) {
            document.getElementById('mainDiv').classList.remove('hide');
            document.getElementById('backgroundStart').classList.remove('hide');
        }
        if (window.innerWidth < 920 || window.innerHeight < 480) {
            document.getElementById('footerWalkbuttonDiv').classList.remove('hide');
            document.getElementById('footerAttackbuttonDiv').classList.remove('hide');
        }
    } else {
        // einschalten
        infoScreenOn = true;
        world.isPaused = true;
        document.getElementById('infoScreen').classList.remove('hide');
        if (!gameStart) {
            document.getElementById('mainDiv').classList.add('hide');
            document.getElementById('backgroundStart').classList.add('hide');
        }
        if (window.innerWidth < 920 || window.innerHeight < 480) {
            document.getElementById('footerWalkbuttonDiv').classList.add('hide');
            document.getElementById('footerAttackbuttonDiv').classList.add('hide');
        }
    }
}

function gameOverScreen() {
    setTimeout(() => {
        document.getElementById('backgroundGameOver').classList.remove('hide');

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').classList.remove('hide');
        document.getElementById('footerWalkbuttonDiv').classList.add('hide');
        document.getElementById('footerAttackbuttonDiv').classList.add('hide');
        document.getElementById('buttonInfo').classList.add('hide');
        document.getElementById('buttonFullscreen').classList.add('hide');

        world.pauseGame();
    }, 2500);
}

function winScreen() {
    setTimeout(() => {
        document.getElementById('backgroundWin').classList.remove('hide');

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').classList.remove('hide');
        document.getElementById('footerWalkbuttonDiv').classList.add('hide');
        document.getElementById('footerAttackbuttonDiv').classList.add('hide');
        document.getElementById('buttonInfo').classList.add('hide');
        document.getElementById('buttonFullscreen').classList.add('hide');

        world.pauseGame();
    }, 2500);
}

function resetGame() {
    document.getElementById('backgroundWin').classList.add('hide');
    document.getElementById('backgroundGameOver').classList.add('hide');
    document.getElementById('uiBackgroundSection').classList.remove('background_color');
    document.getElementById('footerResetbuttonDiv').classList.add('hide');
    document.getElementById('buttonInfo').classList.remove('hide');
    document.getElementById('buttonFullscreen').classList.remove('hide');
    document.getElementById('mainDiv').classList.remove('hide');
    document.getElementById('backgroundStart').classList.remove('hide');
    gameStart = false;
    infoScreenOn = false;
    world = null;
    init();
}