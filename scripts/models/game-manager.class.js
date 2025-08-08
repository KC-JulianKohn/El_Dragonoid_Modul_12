class GameManager {
    static intervalIds = [];
    static timeoutIds = [];
    static isPaused = false;
    static pauseStart = 0;
    static totalPausedTime = 0;
    static startTime = Date.now();

    static addInterval(callback, time) {
        let id = setInterval(() => {
            if (!GameManager.isPaused) callback();
        }, time);
        GameManager.intervalIds.push(id);
        return id;
    }

    static addTimeout(callback, time) {
        let id = window.setTimeout(() => {
            if (!GameManager.isPaused) callback();
        }, time);
        GameManager.timeoutIds.push(id);
        return id;
    }

    static pauseGame() {
        GameManager.isPaused = true;
        GameManager.pauseStart = Date.now();
    }

    static resumeGame() {
        GameManager.isPaused = false;
        GameManager.totalPausedTime += Date.now() - GameManager.pauseStart;
    }

    static getCurrentTime() {
        return Date.now() - GameManager.totalPausedTime;
    }
}