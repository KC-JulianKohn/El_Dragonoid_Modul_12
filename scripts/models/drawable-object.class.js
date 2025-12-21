class DrawableObject {
    /** Default height of the drawable object */
    height = 120;
    /** Default width of the drawable object */
    width = 120;
    /** Horizontal position */
    x = 0;
    /** Vertical position */
    y = 320;
    /** Current image element */
    img;
    /** Cache of loaded images */
    imageCache = {};
    /** Index of current image in animation */
    currentImage = 0;
    /** Generic count for display purposes */
    currentlycount = 0;

    /** Hitbox offsets */
    hitbox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    /** Counters for resources or kills */
    counters = {
        food: 1,
        treasure: 0,
        kills: 0
    };

    /**
     * Loads an image from the given path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads an array of image paths into the cache.
     * @param {string[]} arr - Array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Checks collision with another drawable object.
     * @param {DrawableObject} mo - Another drawable object.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.hitbox.right > mo.x + mo.hitbox.left &&
            this.y + this.height - this.hitbox.bottom > mo.y + mo.hitbox.top &&
            this.x + this.hitbox.left < mo.x + mo.width - mo.hitbox.right &&
            this.y + this.hitbox.top < mo.y + mo.height - mo.hitbox.bottom
    }

    /**
     * Increases a specific counter.
     * @param {string} type - Counter type (e.g., 'food', 'treasure', 'kills').
     * @param {number} amount - Amount to increase.
     */
    increaseCounter(type, amount) {
        this.counters[type] += amount;
    }

    /**
     * Decreases a specific counter but not below zero.
     * @param {string} type - Counter type.
     * @param {number} amount - Amount to decrease.
     */
    decreaseCounter(type, amount) {
        this.counters[type] -= amount;
        if (this.counters[type] < 0) {
            this.counters[type] = 0;
        }
    }

    /**
     * Sets the currently displayed count.
     * @param {number} count - Count to set.
     */
    setCount(count) {
        this.currentlycount = count
    }
}
