class DeadCounter extends DrawableObject {
    x = 460;
    y = 10;
    width = 40;
    height = 40;

    constructor() {
        super().loadImage('./assets/img/7_statusbars/enemystack.png');
    }

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