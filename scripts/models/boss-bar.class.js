class BossBar extends DrawableObject {
    images_bossbar = [
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_00.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_20.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_40.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_60.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_80.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_100.png'
    ];
    percentage = 25;

    constructor() {
        super();
        this.loadImages(this.images_bossbar);
        this.width = 160;
        this.height = 50;
        this.setPercentage(25);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_bossbar[this.resolveImagIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagIndex() {
        if (this.percentage == 25) {
            return 5;
        } else if (this.percentage > 20) {
            return 4;
        } else if (this.percentage > 15) {
            return 3;
        } else if (this.percentage > 10) {
            return 2;
        } else if (this.percentage > 5) {
            return 1;
        } else {
            return 0;
        }
    }

    updatePosition(boss) {
        this.x = boss.x + boss.width / 2 - this.width / 2 + 30;
        this.y = boss.y + 70;
    }
}