class DrawableObject {
    height = 120;
    width = 120;
    x = 0;
    y = 320;
    img;
    imageCache = {};
    currentImage = 0;

    hitbox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Knight_1 || this instanceof Knight_2 || this instanceof Knight_3 || this instanceof Skeleton || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameHitBox(ctx) {
        if (this instanceof Character || this instanceof Knight_1 || this instanceof Knight_2 || this instanceof Knight_3 || this instanceof Skeleton || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.hitbox.left,
                this.y + this.hitbox.top,
                this.width - this.hitbox.left - this.hitbox.right,
                this.height - this.hitbox.top - this.hitbox.bottom
            ); ctx.stroke();
        }
    }
}