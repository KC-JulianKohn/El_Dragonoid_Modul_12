class World {
    /** @type {Level} Current game level containing enemies, treasures, food, and background. */
    level = level1;
    /** @type {HTMLCanvasElement} Canvas used for rendering the game. */
    canvas;
    /** @type {CanvasRenderingContext2D} 2D rendering context of the canvas. */
    ctx;
    /** @type {Keyboard} Keyboard input manager. */
    keyboard;
    /** @type {number} Camera X position for horizontal scrolling. */
    camera_x = 0;
    /** @type {Fireball|null} Active fireball object, if any. */
    fireball = null;
    /** @type {boolean} Flag indicating if the game has ended. */
    gameEnd = false;
    /** @type {Character} The player character object. */
    character = new Character();
    /** @type {HealthBar} UI element for the character's health. */
    healthBar = new HealthBar();
    /** @type {DeadCounter} UI element counting kills. */
    deadcounter = new DeadCounter();
    /** @type {FoodCounter} UI element counting collected food. */
    foodcounter = new FoodCounter();
    /** @type {TreasureCounter} UI element counting collected treasures. */
    treasurecounter = new TreasureCounter();
    /** @type {EndbossBar} UI element showing the endboss health. */
    endbossBar = new EndbossBar();

    /**
    * Initializes the world with canvas and keyboard input.
    * @param {HTMLCanvasElement} canvas
    * @param {Keyboard} keyboard
    */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAll();
    }

    /**
     * Sets the world reference for character and enemies.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (typeof enemy.start === 'function') {
                enemy.start();
            }
        });
    }

    /**
    * Starts continuous checks for collisions and interactions.
    */
    checkAll() {
        GameManager.addInterval(() => {
            this.level.enemies.forEach((enemy) => this.handleEnemyCollision(enemy));
            this.level.treasure.forEach((treasure) => this.handleTreasureCollision(treasure));
            this.level.food.forEach((food) => this.handleFoodCollision(food));
        }, 500);
    }

    /**
     * Handles collision and interactions with a single enemy.
     * @param {MovableObject} enemy
     */
    handleEnemyCollision(enemy) {
        this.handleCharacterVsEnemy(enemy);
        this.handleFireballVsEnemy(enemy);
        this.handleEnemyDeath(enemy);
        if (enemy instanceof Endboss) this.handleEndboss(enemy);
    }

    /**
     * Handles character attacking or getting hit by an enemy.
     * @param {MovableObject} enemy
     */
    handleCharacterVsEnemy(enemy) {
        if (!this.character.isAttacking && !enemy.isDead() && this.character.isColliding(enemy)) {
            this.character.hit(enemy.damage);
            this.healthBar.setPercentage(this.character.health);
            if (!this.gameEnd && this.character.isDead()) {
                SoundHub.playSoundOne(SoundHub.DRAGONDEAD, 0.7);
                this.gameEnd = true;
                gameOverScreen();
            }
        }
        if (this.character.isAttacking && this.character.isColliding(enemy) && !enemy.isHurt() && !enemy.isAttacking) {
            enemy.hit(this.character.damage);
        }
    }

    /**
     * Handles fireball collision with an enemy.
     * @param {MovableObject} enemy
     */
    handleFireballVsEnemy(enemy) {
        if (!enemy.isHurt() && !enemy.isDead() && this.fireball && !this.fireball.hasExploded && this.fireball.isColliding(enemy)) {
            SoundHub.playSoundOne(SoundHub.EXPLOSION, 0.8);
            this.fireball.triggerExplosion();
            if (!enemy.isAttacking) enemy.hit(this.fireball.damage);
        }
        if (this.fireball && this.fireball.hasExploded && !enemy.isHurt() && !enemy.isDead() && this.fireball.isColliding(enemy)) {
            if (!enemy.hasBeenHitByExplosion) {
                enemy.hasBeenHitByExplosion = true;
                enemy.hit(this.fireball.damage);
            }
        }
    }

    /**
     * Handles enemy death, counting kills and rewards.
     * @param {MovableObject} enemy
     */
    handleEnemyDeath(enemy) {
        if (!enemy.isDead() || enemy.countedAsKill) return;
        if (enemy instanceof Knight_1 || enemy instanceof Knight_2 || enemy instanceof Knight_3) {
            SoundHub.playSoundOne(SoundHub.KNIGHTDEAD, 0.5);
        }
        if (enemy instanceof Skeleton) {
            SoundHub.playSoundOne(SoundHub.SKELETONDEAD, 0.7);
        }
        enemy.countedAsKill = true;
        this.character.increaseCounter("kills", 1);
        this.deadcounter.setCount(this.character.counters.kills);
        if ([5, 10, 15].includes(this.character.counters.kills)) {
            this.character.increaseCounter("food", 1);
        }
    }

    /**
     * Handles endboss-specific logic.
     * @param {Endboss} enemy
     */
    handleEndboss(enemy) {
        enemy.checkActivation(this.character);
        this.endbossBar.updatePosition(enemy);
        this.endbossBar.setPercentage(enemy.health);
        this.level.level_end_x = enemy.x + 10;
        if (!this.gameEnd && enemy.isDead()) {
            SoundHub.playSoundOne(SoundHub.KNIGHTDEAD, 0.5);
            this.gameEnd = true;
            winScreen();
        }
    }

    /**
     * Handles collision with a treasure item.
     * @param {DrawableObject} treasure
     */
    handleTreasureCollision(treasure) {
        this.treasurecounter.setCount(this.character.counters.treasure);
        if (!this.character.isColliding(treasure)) return;
        SoundHub.playSoundOne(SoundHub.TREASURE, 0.7);
        treasure.y += 3000;
        this.character.increaseCounter("treasure", 1);
    }

    /**
     * Handles collision with a food item.
     * @param {DrawableObject} food
     */
    handleFoodCollision(food) {
        this.foodcounter.setCount(this.character.counters.food);
        if (!this.character.isColliding(food)) return;
        SoundHub.playSoundOne(SoundHub.FOOD, 0.9);
        food.y += 3000;
        this.character.increaseCounter("food", 1);
    }

    /**
     * Draws the game world and all objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawUI();
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    /**
     * Draws all level objects in the exact required order.
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.treasure);
        this.addObjectsToMap(this.level.food);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endbossBar);
        if (this.fireball) this.addToMap(this.fireball);
    }

    /**
     * Draws all UI elements on top of the game canvas.
     */
    drawUI() {
        this.addToMap(this.healthBar);
        this.addToMap(this.deadcounter);
        this.addToMap(this.foodcounter);
        this.addToMap(this.treasurecounter);
    }

    /**
     * Adds an array of objects to the map.
     * @param {Array<DrawableObject>} objects
     */
    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }

    /**
     * Adds a single object to the map, flipping if necessary.
     * @param {DrawableObject} mo
     */
    addToMap(mo) {
        if (!mo) return;
        if (mo.otherDirection) { this.flipImage(mo); }
        mo.draw(this.ctx);
        if (mo.otherDirection) { this.flipImageBack(mo); }
    }

    /**
     * Flips an object horizontally for rendering.
     * @param {DrawableObject} mo
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores object flip after drawing.
    * @param {DrawableObject} mo
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}