class Food extends DrawableObject {
    /** Height of the food object */
    height = 40;
    /** Width of the food object */
    width = 40;
    /** Vertical position */
    y = 400;
    /** Vertical movement speed for floating animation */
    speedY = -1;

    /**
     * Creates a food object with floating animation.
     * @param {string} imgePath - Path to the food image.
     * @param {number} x - Horizontal spawn position.
     */
    constructor(imgePath, x) {
        super().loadImage(imgePath);
        this.x = x;
        this.animateFloating();
    }

    /**
     * Animates the food to float up and down.
     */
    animateFloating() {
        GameManager.addInterval(() => {
            this.y += this.speedY;

            if (this.y <= 380 || this.y >= 400) {
                this.speedY *= -1;
            }
        }, 60);
    }
}