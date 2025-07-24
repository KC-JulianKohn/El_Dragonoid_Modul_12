class StatusBar extends DrawableObject{
    images_healthbar = [
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_00.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_20.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_40.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_60.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_80.png',
        './assets/img/7_statusbars/2_statusbar_health/health_overlay_100.png',

    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.images_healthbar);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_healthbar[this.resolveImagIndex()];
        this.img = this.imageCache[path];
    }

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




}