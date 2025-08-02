class FoodCounter extends DrawableObject {
    x = 230;
    y = 10;
    width = 35;
    height = 35;

    constructor() {
        super().loadImage('./assets/img/7_statusbars/foodstack.png');
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.font = '24px Bitcount Grid Single';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'left';
        ctx.fillText(`${this.currentlycount}`, this.x + 45, this.y + 25);
    }
}