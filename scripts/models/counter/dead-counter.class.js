class DeadCounter extends DrawableObject {
    /** Horizontal position on canvas */
    x = 460;
    /** Vertical position on canvas */
    y = 10;
    /** Width of the counter icon */
    width = 40;
    /** Height of the counter icon */
    height = 40;

    /**
     * Initializes the dead counter with the enemy stack image.
     */
    constructor() {
        super().loadImage('./assets/img/7_statusbars/enemystack.png');
    }

    /**
     * Draws the dead counter icon and current count on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '24px Bitcount Grid Single';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        if (this.currentlycount >= 11) {
            ctx.fillText(`${this.currentlycount}`, this.x + 45, this.y + 25);
        } else {
            ctx.fillText(`${this.currentlycount}/10`, this.x + 45, this.y + 25);
        }
    }
}