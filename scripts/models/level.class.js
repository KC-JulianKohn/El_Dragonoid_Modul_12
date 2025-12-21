class Level {
    /** Array of enemy objects in the level */
    enemies;
    /** Array of background objects in the level */
    backgroundObjects;
    /** Array of treasure objects in the level */
    treasure;
    /** Array of food objects in the level */
    food;
    /** Reference to the world the level belongs to */
    world;
    /** X coordinate that marks the end of the level */
    level_end_x = 5000;

    /**
     * Creates a new game level.
     * @param {Array<MovableObject>} enemies - List of enemies in the level.
     * @param {Array<BackgroundObjekt>} backgroundObjects - List of background elements.
     * @param {Array<Treasure>} treasure - List of treasure objects.
     * @param {Array<Food>} food - List of food objects.
     */
    constructor(enemies, backgroundObjects, treasure, food) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.food = food;
    }
}
