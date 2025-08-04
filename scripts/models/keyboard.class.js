class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    F = false;

    constructor() {
        this.bindingButtonPressEvent();
        this.bindingKeyPressEvent();
    }


    bindingButtonPressEvent() {
        this.pressEventTouchStart();
        this.pressEventTouchEnd();
    }

    bindingKeyPressEvent() {
        window.addEventListener("keydown", (e) => {
            this.pressEventKeyDown(e);
        });

        window.addEventListener("keyup", (e) => {
            this.pressEventKeyUp(e);
        });
    }

    pressEventTouchStart() {
        let btnUp = document.getElementById('buttonUp')
        if (btnUp) {
            btnUp.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.UP = true;
            });
        }
        let btnDown = document.getElementById('buttonDown')
        if (btnDown) {
            btnDown.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.DOWN = true;
            });
        }
        let btnLeft = document.getElementById('buttonLeft')
        if (btnLeft) {
            btnLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });
        }
        let btnRight = document.getElementById('buttonRight')
        if (btnRight) {
            btnRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });
        }
        let btnSpace = document.getElementById('buttonSpace')
        if (btnSpace) {
            btnSpace.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });
        }
        let btnF = document.getElementById('buttonF')
        if (btnF) {
            btnF.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.F = true;
            });
        }
    }

    pressEventTouchEnd() {
        let btnUp = document.getElementById('buttonUp')
        if (btnUp) {
            btnUp.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.UP = false;
            });
        }
        let btnDown = document.getElementById('buttonDown')
        if (btnDown) {
            btnDown.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.DOWN = false;
            });
        }
        let btnLeft = document.getElementById('buttonLeft')
        if (btnLeft) {
            btnLeft.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });
        }
        let btnRight = document.getElementById('buttonRight')
        if (btnRight) {
            btnRight.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });
        }
        let btnSpace = document.getElementById('buttonSpace')
        if (btnSpace) {
            btnSpace.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
        }
        let btnF = document.getElementById('buttonF')
        if (btnF) {
            btnF.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.F = false;
            });
        }
    }

    pressEventKeyDown(e) {
        if (e.keyCode == 87) {
            this.UP = true;
        }
        if (e.keyCode == 83) {
            this.DOWN = true;
        }
        if (e.keyCode == 65) {
            this.LEFT = true;
        }
        if (e.keyCode == 68) {
            this.RIGHT = true;
        }
        if (e.keyCode == 32) {
            this.SPACE = true;
        }
        if (e.keyCode == 70) {
            this.F = true;
        }
    }

    pressEventKeyUp(e) {
        if (e.keyCode == 87) {
            this.UP = false;
        }
        if (e.keyCode == 83) {
            this.DOWN = false;
        }
        if (e.keyCode == 65) {
            this.LEFT = false;
        }
        if (e.keyCode == 68) {
            this.RIGHT = false;
        }
        if (e.keyCode == 32) {
            this.SPACE = false;
        }
        if (e.keyCode == 70) {
            this.F = false;
        }
    }
}