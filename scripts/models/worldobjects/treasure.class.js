class Treasure extends DrawableObject {
    /** Height of the treasure object */
    height = 35;
    /** Width of the treasure object */
    width = 35;
    /** Vertical position */
    y = 100;
    /** Vertical movement speed for floating animation */
    speedY = -1;

    /**
     * Creates a treasure object with randomized floating animation.
     * @param {string} imgePath - Path to the treasure image.
     * @param {number} x - Horizontal spawn position.
     */
    constructor(imgePath, x) {
        super().loadImage(imgePath);
        this.x = x;
        this.randomY = 110 + Math.random() * 260;
        this.floatSpeed = 10 + Math.random() * 70;
        this.animateFloating();
    }

    /**
     * Animates the treasure to float up and down within a random range.
     */
    animateFloating() {
        GameManager.addInterval(() => {
            this.y += this.speedY;
            if (this.y <= 60 || this.y >= this.randomY) {
                this.speedY *= -1;
            }
        }, this.floatSpeed);
    }
}