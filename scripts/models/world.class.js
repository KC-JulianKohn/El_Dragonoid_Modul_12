class World {
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    character = new Character();
    healthBar = new HealthBar();
    deadcounter = new DeadCounter();
    foodcounter = new FoodCounter();
    treasurecounter = new TreasureCounter();
    bossBar = new BossBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkAll();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
            if (typeof enemy.start === 'function') {
                enemy.start();
            }
        });
    }

    checkAll() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (!this.character.isAttacking && !enemy.isDead() && this.character.isColliding(enemy)) {
                    this.character.hit(enemy.damage);
                    this.healthBar.setPercentage(this.character.health);
                }
                if (this.character.isAttacking && this.character.isColliding(enemy) && !enemy.isHurt() && !enemy.isAttacking) {
                    enemy.hit(this.character.damage);
                }
                if (enemy.isDead() && !enemy.countedAsKill) {
                    enemy.countedAsKill = true;
                    this.character.increaseCounter("kills", 1);
                    this.deadcounter.setCount(this.character.counters.kills);
                }
                if (enemy instanceof Endboss) {
                    enemy.checkActivation(this.character);
                    this.bossBar.updatePosition(enemy);
                    this.bossBar.setPercentage(enemy.health);
                    this.level.level_end_x = enemy.x - 230;                    
                }
            });

            this.level.treasure.forEach((treasure) => {
                if (this.character.isColliding(treasure)) {
                    treasure.y += 3000;
                    this.character.increaseCounter("treasure", 1);
                    this.treasurecounter.setCount(this.character.counters.treasure);
                }
            });

            this.level.food.forEach((food) => {
                if (this.character.isColliding(food)) {
                    food.y += 3000;
                    this.character.increaseCounter("food", 1);
                    this.foodcounter.setCount(this.character.counters.food);
                }
            });


        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.treasure);
        this.addObjectsToMap(this.level.food);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.deadcounter);
        this.addToMap(this.foodcounter);
        this.addToMap(this.treasurecounter);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.bossBar);

        this.ctx.translate(-this.camera_x, 0);


        let self = this
        requestAnimationFrame(function () { self.draw(); });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameHitBox(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}