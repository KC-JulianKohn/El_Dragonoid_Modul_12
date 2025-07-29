class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
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
                    this.character.increaseCounter("kills", 1)

                    console.log(this.character.counters.kills);
                }
                if (enemy instanceof Endboss) {
                    enemy.checkActivation(this.character);
                    this.bossBar.updatePosition(enemy);
                    this.bossBar.setPercentage(enemy.health);
                    this.level.level_end_x = enemy.x - 230;
                }
            });
        }, 500);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
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