/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keyboard} */
let keyboard;
/** @type {boolean} */
let infoScreenOn = false;

/**
 * Initializes the game, sets up canvas, keyboard, level, world, and volume.
 */
function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    level1 = getFreshLevel1();
    world = new World(canvas, keyboard);
    displayWarning();
    GameManager.pauseGame();
    let volumeSlider = document.getElementById('volume');
    volumeSlider.value = SoundHub.loadVolume();
    SoundHub.objSetVolume();
}

/**
 * Periodically checks the display orientation and shows/hides warning.
 */
function displayWarning() {
    setInterval(() => {
        if (window.innerWidth < window.innerHeight) {
            document.getElementById('displayPositionWarning').classList.remove('hide');
        } else {
            document.getElementById('displayPositionWarning').classList.add('hide');
        }
    }, 250);
}

/**
 * Toggles fullscreen mode for the game.
 */
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

/**
 * Requests fullscreen mode on a given element.
 * @param {HTMLElement} elem - The element to make fullscreen.
 */
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

/**
 * Exits fullscreen mode.
 */
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

/**
 * Starts the game, resumes the GameManager, and plays background music.
 */
function startGame() {
    GameManager.gameStart = true;
    GameManager.resumeGame();
    SoundHub.playSoundLoop(SoundHub.BACKGROUNDMUSIC, 0.5);
    document.getElementById('mainDiv').classList.add('hide');
    document.getElementById('backgroundStart').classList.add('hide');
    if (window.matchMedia('(pointer: coarse)').matches) {
        document.getElementById('footerWalkbuttonDiv').classList.remove('hide');
        document.getElementById('footerAttackbuttonDiv').classList.remove('hide');
    }
}

/**
 * Toggles the info screen display on/off.
 */
function infoScreen() {
    if (infoScreenOn) {
        hideInfoScreenElements();
        infoScreenOn = false;
        if (GameManager.isPaused && GameManager.gameStart) {
            GameManager.resumeGame();
        }
    } else {
        showInfoScreenElements();
        infoScreenOn = true;
        GameManager.pauseGame();
    }
}

/**
 * Hides the info screen and restores other DOM elements.
 */
function hideInfoScreenElements() {
    document.getElementById('infoScreen').classList.add('hide');
    if (!GameManager.gameStart) {
        document.getElementById('mainDiv').classList.remove('hide');
        document.getElementById('backgroundStart').classList.remove('hide');
    }
    if (window.matchMedia('(pointer: coarse)').matches) {
        document.getElementById('footerWalkbuttonDiv').classList.remove('hide');
        document.getElementById('footerAttackbuttonDiv').classList.remove('hide');
    }
}

/**
 * Shows the info screen and hides other DOM elements.
 */
function showInfoScreenElements() {
    document.getElementById('infoScreen').classList.remove('hide');
    if (!GameManager.gameStart) {
        document.getElementById('mainDiv').classList.add('hide');
        document.getElementById('backgroundStart').classList.add('hide');
    }
    if (window.matchMedia('(pointer: coarse)').matches) {
        document.getElementById('footerWalkbuttonDiv').classList.add('hide');
        document.getElementById('footerAttackbuttonDiv').classList.add('hide');
    }
}

/**
 * Displays the game over screen, stops gameplay, and plays sounds.
 */
function gameOverScreen() {
    SoundHub.playSoundOne(SoundHub.GAMEOVER2, 0.7);
    GameManager.addTimeout(() => {
        GameManager.pauseGame();
        SoundHub.clearAll();
        GameManager.gameEnd = true;
        SoundHub.playSoundOne(SoundHub.GAMEOVER1, 0.7);
        updateGameOverDOM();
    }, 2500);
}

/**
 * Updates DOM elements for game over screen.
 */
function updateGameOverDOM() {
    document.getElementById('backgroundGameOver').classList.remove('hide');
    document.getElementById('uiBackgroundSection').classList.add('background_color');
    document.getElementById('footerResetbuttonDiv').classList.remove('hide');
    document.getElementById('footerWalkbuttonDiv').classList.add('hide');
    document.getElementById('footerAttackbuttonDiv').classList.add('hide');
    document.getElementById('buttonInfo').classList.add('hide');
    document.getElementById('buttonFullscreen').classList.add('hide');
}

/**
 * Displays the win screen, stops gameplay, and plays sound.
 */
function winScreen() {
    GameManager.addTimeout(() => {
        GameManager.pauseGame();
        SoundHub.clearAll();
        GameManager.gameEnd = true;
        SoundHub.playSoundOne(SoundHub.WIN, 0.7);
        updateWinScreenDOM();
    }, 2500);
}

/**
 * Updates DOM elements for win screen.
 */
function updateWinScreenDOM() {
    document.getElementById('backgroundWin').classList.remove('hide');
    document.getElementById('uiBackgroundSection').classList.add('background_color');
    document.getElementById('footerResetbuttonDiv').classList.remove('hide');
    document.getElementById('footerWalkbuttonDiv').classList.add('hide');
    document.getElementById('footerAttackbuttonDiv').classList.add('hide');
    document.getElementById('buttonInfo').classList.add('hide');
    document.getElementById('buttonFullscreen').classList.add('hide');
}

/**
 * Resets the game to initial state.
 */
function resetGame() {
    SoundHub.clearAll();
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) { enemy.clearLocalTimers(); }
        });
    }
    resetDOMElements();
    GameManager.gameStart = false;
    GameManager.gameEnd = false;
    infoScreenOn = false;
    world = null;
    init();
}

/**
 * Resets all relevant DOM elements for a new game.
 */
function resetDOMElements() {
    document.getElementById('backgroundWin').classList.add('hide');
    document.getElementById('backgroundGameOver').classList.add('hide');
    document.getElementById('uiBackgroundSection').classList.remove('background_color');
    document.getElementById('footerResetbuttonDiv').classList.add('hide');
    document.getElementById('buttonInfo').classList.remove('hide');
    document.getElementById('buttonFullscreen').classList.remove('hide');
    document.getElementById('mainDiv').classList.remove('hide');
    document.getElementById('backgroundStart').classList.remove('hide');
}

/**
 * Sets up event listeners for the info button after window load.
 */
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
