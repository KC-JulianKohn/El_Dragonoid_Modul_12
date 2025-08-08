class Food extends DrawableObject {
    height = 40;
    width = 40;
    y = 400;
    speedY = -1;

    constructor(imgePath, x) {
        super().loadImage(imgePath);
        this.x = x;
        this.animateFloating();
    }

    animateFloating() {
        GameManager.addInterval(() => {
            this.y += this.speedY;

            if (this.y <= 380 || this.y >= 400) {
                this.speedY *= -1;
            }
        }, 60);
    }
}