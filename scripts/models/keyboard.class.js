class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    F = false;

    /**
    * Initializes the keyboard handler and binds touch and key events.
    */
    constructor() {
        this.bindingButtonPressEvent();
        this.bindingKeyPressEvent();
    }

    /**
     * Bind all touch button press events.
     */
    bindingButtonPressEvent() {
        this.pressEventTouchStart();
        this.pressEventTouchEnd();
    }

    /**
     * Bind all key press events for keyboard.
     */
    bindingKeyPressEvent() {
        window.addEventListener("keydown", (e) => {
            this.pressEventKeyDown(e);
        });
        window.addEventListener("keyup", (e) => {
            this.pressEventKeyUp(e);
        });
    }

    /**
     * Bind touchstart events for all relevant buttons.
     */
    pressEventTouchStart() {
        this.touchStartBtn('buttonUp', 'UP');
        this.touchStartBtn('buttonDown', 'DOWN');
        this.touchStartBtn('buttonLeft', 'LEFT');
        this.touchStartBtn('buttonRight', 'RIGHT');
        this.touchStartBtn('buttonSpace', 'SPACE');
        this.touchStartBtn('buttonF', 'F');
    }

    /**
     * Handles a single touchstart event for a specific button.
     * @param {string} btnId - The ID of the button element.
     * @param {string} keyProp - The key property to set to true.
     */
    touchStartBtn(btnId, keyProp) {
        let btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[keyProp] = true;
            });
        }
    }

    /**
     * Bind touchend events for all relevant buttons.
     */
    pressEventTouchEnd() {
        this.touchEndBtn('buttonUp', 'UP');
        this.touchEndBtn('buttonDown', 'DOWN');
        this.touchEndBtn('buttonLeft', 'LEFT');
        this.touchEndBtn('buttonRight', 'RIGHT');
        this.touchEndBtn('buttonSpace', 'SPACE');
        this.touchEndBtn('buttonF', 'F');
    }

    /**
     * Handles a single touchend event for a specific button.
     * @param {string} btnId - The ID of the button element.
     * @param {string} keyProp - The key property to set to false.
     */
    touchEndBtn(btnId, keyProp) {
        let btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this[keyProp] = false;
            });
        }
    }

    /**
     * Handles a keydown event from the keyboard.
     * @param {KeyboardEvent} e
     */
    pressEventKeyDown(e) {
        if (e.keyCode == 87) { this.UP = true; }
        if (e.keyCode == 83) { this.DOWN = true; }
        if (e.keyCode == 65) { this.LEFT = true; }
        if (e.keyCode == 68) { this.RIGHT = true; }
        if (e.keyCode == 32) { this.SPACE = true; }
        if (e.keyCode == 70) { this.F = true; }
    }

    /**
     * Handles a keyup event from the keyboard.
     * @param {KeyboardEvent} e
     */
    pressEventKeyUp(e) {
        if (e.keyCode == 87) { this.UP = false; }
        if (e.keyCode == 83) { this.DOWN = false; }
        if (e.keyCode == 65) { this.LEFT = false; }
        if (e.keyCode == 68) { this.RIGHT = false; }
        if (e.keyCode == 32) { this.SPACE = false; }
        if (e.keyCode == 70) { this.F = false; }
    }
}