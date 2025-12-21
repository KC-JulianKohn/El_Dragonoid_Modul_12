class TreasureCounter extends DrawableObject {
    /** Horizontal position on canvas */
    x = 330;
    /** Vertical position on canvas */
    y = 10;
    /** Width of the counter icon */
    width = 35;
    /** Height of the counter icon */
    height = 35;

    /**
     * Initializes the treasure counter with the treasure stack image.
     */
    constructor() {
        super().loadImage('./assets/img/7_statusbars/treasurestack.png');
    }

    /**
     * Draws the treasure counter icon and current count on the canvas.
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