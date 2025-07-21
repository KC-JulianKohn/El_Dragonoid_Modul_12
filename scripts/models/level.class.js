class Level {
    enemies;
    backgroundObjects;
    level_end_x = 5000;

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}