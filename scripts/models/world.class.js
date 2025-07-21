class World {
    character = new Character();
    enemies = [
        new Knight(),
        new Knight()

    ];
    backgroundObjects = [
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, -1000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, -1000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, -1000, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 0, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 0, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 0, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 1000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 1000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 1000, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 2000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 2000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 2000, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 3000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 3000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 3000, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 4000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 4000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 4000, 0),
        new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 5000, 0),
        new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 5000, 0),
        new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 5000, 0)
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);


        let self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}