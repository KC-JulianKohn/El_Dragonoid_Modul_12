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
    GameManager.pauseGame();
    SoundHub.objSetVolume();
}

function displayWarning() {
    GameManager.addInterval(() => {
        if (window.innerWidth < window.innerHeight) {
            document.getElementById('displayPositionWarning').classList.remove('hide');
        } else {
            document.getElementById('displayPositionWarning').classList.add('hide');
        }
    }, 250);
}

function fullscreen() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        closeFullscreen();
        document.getElementById("canvas").style.width = '';
        document.getElementById("canvas").style.height = '';
        document.getElementById("buttonFullscreen").innerText = '⛶';
    } else {
        openFullscreen(document.getElementById("fullscreen"));
        document.getElementById("canvas").style.width = '100%';
        document.getElementById("canvas").style.height = '100%';
        document.getElementById("buttonFullscreen").innerText = '🗗';
    }
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function startGame() {
    gameStart = true;
    GameManager.resumeGame();
    SoundHub.playSoundLoop(SoundHub.BACKGROUNDMUSIC, 0.5);
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
        // SoundHub.resumeAll();
        document.getElementById('infoScreen').classList.add('hide');
        infoScreenOn = false;
        if (GameManager.isPaused && gameStart) {
            GameManager.resumeGame();
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
        GameManager.pauseGame();
        // SoundHub.pauseAll();
        infoScreenOn = true;
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
    SoundHub.playSoundOne(SoundHub.GAMEOVER2, 0.7);
    SoundHub.clearAll();
    GameManager.addTimeout(() => {
        SoundHub.playSoundOne(SoundHub.GAMEOVER1, 0.7);
        document.getElementById('backgroundGameOver').classList.remove('hide');

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').classList.remove('hide');
        document.getElementById('footerWalkbuttonDiv').classList.add('hide');
        document.getElementById('footerAttackbuttonDiv').classList.add('hide');
        document.getElementById('buttonInfo').classList.add('hide');
        document.getElementById('buttonFullscreen').classList.add('hide');

        GameManager.pauseGame();
    }, 2500);
}

function winScreen() {
    GameManager.addTimeout(() => {
        SoundHub.clearAll();
        SoundHub.playSoundOne(SoundHub.WIN, 0.7);
        document.getElementById('backgroundWin').classList.remove('hide');

        document.getElementById('uiBackgroundSection').classList.add('background_color');
        document.getElementById('footerResetbuttonDiv').classList.remove('hide');
        document.getElementById('footerWalkbuttonDiv').classList.add('hide');
        document.getElementById('footerAttackbuttonDiv').classList.add('hide');
        document.getElementById('buttonInfo').classList.add('hide');
        document.getElementById('buttonFullscreen').classList.add('hide');

        GameManager.pauseGame();
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

window.addEventListener('load', () => {
    const infoBtn = document.getElementById('buttonInfo');
    if (infoBtn) {
        infoBtn.addEventListener('click', infoScreen);

        infoBtn.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
            }
        });
    }
});