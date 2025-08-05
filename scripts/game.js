let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
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
