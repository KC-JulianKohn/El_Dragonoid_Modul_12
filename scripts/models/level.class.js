class Level {
    enemies;
    backgroundObjects;
    level_end_x = 5000;

    constructor(enemiesParam, backgroundObjectsParam) {
        this.enemies = enemiesParam;
        this.backgroundObjects = backgroundObjectsParam;
    }
}