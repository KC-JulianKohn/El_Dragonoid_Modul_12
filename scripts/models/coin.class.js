class Coin extends DrawableObject {
    height = 35;
    width = 35;
    y = 100;
    speedY = -1;

    constructor(imgePath, x) {
        super().loadImage(imgePath);
        this.x = x;
        this.randomY = 110 + Math.random() * 260;
        this.floatSpeed = 10 + Math.random() * 70;
        this.animateFloating();
    }

    animateFloating() {
        setInterval(() => {
            this.y += this.speedY;

            if (this.y <= 60 || this.y >= this.randomY) {
                this.speedY *= -1;
            }
        }, this.floatSpeed);
    }
}