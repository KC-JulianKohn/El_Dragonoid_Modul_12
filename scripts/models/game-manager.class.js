class GameManager {
    /** IDs of active intervals */
    static intervalIds = [];
    /** IDs of active timeouts */
    static timeoutIds = [];
    /** Indicates if the game is currently paused */
    static isPaused = false;
    /** Indicates if the game has started */
    static gameStart = false;
    /** Indicates if the game has ended */
    static gameEnd = false;
    /** Timestamp when the game was paused */
    static pauseStart = 0;
    /** Total time the game has been paused */
    static totalPausedTime = 0;
    /** Timestamp when the game started */
    static startTime = Date.now();

    /**
     * Adds an interval that executes only if the game is not paused.
     * @param {Function} callback - Function to execute each interval tick.
     * @param {number} time - Interval time in milliseconds.
     * @returns {number} Interval ID
     */
    static addInterval(callback, time) {
        let id = setInterval(() => {
            if (!GameManager.isPaused) callback();
        }, time);
        GameManager.intervalIds.push(id);
        return id;
    }

    /**
     * Adds a timeout that executes only if the game is not paused.
     * @param {Function} callback - Function to execute after timeout.
     * @param {number} time - Timeout duration in milliseconds.
     * @returns {number} Timeout ID
     */
    static addTimeout(callback, time) {
        let id = window.setTimeout(() => {
            if (!GameManager.isPaused) callback();
        }, time);
        GameManager.timeoutIds.push(id);
        return id;
    }

    /**
     * Pauses the game and records the pause start time.
     */
    static pauseGame() {
        GameManager.isPaused = true;
        GameManager.pauseStart = Date.now();
    }

    /**
     * Resumes the game and updates the total paused time.
     */
    static resumeGame() {
        GameManager.isPaused = false;
        GameManager.totalPausedTime += Date.now() - GameManager.pauseStart;
    }

    /**
     * Returns the current game time, excluding paused duration.
     * @returns {number} Time in milliseconds
     */
    static getCurrentTime() {
        return Date.now() - GameManager.totalPausedTime;
    }
}
