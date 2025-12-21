class FoodCounter extends DrawableObject {
    /** Horizontal position on canvas */
    x = 230;
    /** Vertical position on canvas */
    y = 10;
    /** Width of the counter icon */
    width = 35;
    /** Height of the counter icon */
    height = 35;

    /**
    * Initializes the food counter with the food stack image.
    */
    constructor() {
        super().loadImage('./assets/img/7_statusbars/foodstack.png');
    }

    /**
     * Draws the food counter icon and current count on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '24px Bitcount Grid Single';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.currentlycount}`, this.x + 45, this.y + 25);
    }
}