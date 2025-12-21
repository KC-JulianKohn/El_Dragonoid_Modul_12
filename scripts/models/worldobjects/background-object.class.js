class BackgroundObjekt extends MovableObject {
    /** Width of the background object */
    width = 1000;

    /**
     * Creates a background object with a given image and size/position.
     * @param {string} imgePath - Path to the image file.
     * @param {number} height - Height of the object.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     */
    constructor(imgePath, height, x, y) {
        super().loadImage(imgePath);
        this.height = height;
        this.x = x;
        this.y = y;
    }
}