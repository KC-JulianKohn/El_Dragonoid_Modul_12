class HealthBar extends DrawableObject {
    /** Horizontal position on canvas */
    x = 10;
    /** Vertical position on canvas */
    y = -10;
    /** Width of the health bar */
    width = 200;
    /** Height of the health bar */
    height = 60;
    /** Current health percentage */
    percentage = 100;

    images_healthbar = [
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_00.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_20.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_40.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_60.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_80.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_100.png',
    ];

    /**
     * Initializes the health bar and sets it to full health.
     */
    constructor() {
        super();
        this.loadImages(this.images_healthbar);
        this.setPercentage(100);
    }

    /**
    * Sets the health percentage and updates the displayed image.
    * @param {number} percentage - Current health percentage (0-100).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_healthbar[this.resolveImagIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the correct image index based on current health percentage.
     * @returns {number} Index of the image in images_healthbar array.
     */
    resolveImagIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Draws the health bar and percentage text on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '16px Bitcount Grid Single';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.percentage}`, this.x + 165, this.y + 45);
    }
}