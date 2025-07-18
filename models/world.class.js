class World {
    character = new Character();
    enemies = [
        new Knight(),
        new Knight()

    ];
    backgroundObjects = [
        new BackgroundObjekt('./assets/img/5_background/background.png',150, 0, 0),
        new BackgroundObjekt('./assets/img/5_background/tower.png',210, 0, 0),
        new BackgroundObjekt('./assets/img/5_background/bridge.png',290, 0, 190)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}