class TreasureCounter extends DrawableObject {
    x = 330;
    y = 10;
    width = 35;
    height = 35;

    images_treasurecounter = [
        './assets/img/7_statusbars/treasurestack.png',
    ];

    constructor() {
        super();
        this.loadImages(this.images_treasurecounter);
        this.img = this.imageCache[this.images_treasurecounter[0]];
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