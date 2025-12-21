class EndbossBar extends DrawableObject {
    /** Width of the endboss health bar */
    width = 160;
    /** Height of the endboss health bar */
    height = 50;
    /** Current health percentage of the endboss */
    percentage = 25;

    images_endbossbar = [
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_00.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_20.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_40.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_60.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_80.png',
        './assets/img/7_statusbars/1_statusbar_endboss/health_boss_overlay_100.png'
    ];

    /**
     * Initializes the endboss health bar and sets starting percentage.
     */
    constructor() {
        super();
        this.loadImages(this.images_endbossbar);
        this.setPercentage(25);
    }

    /**
     * Sets the health percentage and updates displayed image.
     * @param {number} percentage - Current endboss health (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_endbossbar[this.resolveImagIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves correct image index based on health percentage.
     * @returns {number} Index of the image in images_endbossbar array.
     */
    resolveImagIndex() {
        if (this.percentage >= 50) {
            return 5;
        } else if (this.percentage >= 40) {
            return 4;
        } else if (this.percentage >= 30) {
            return 3;
        } else if (this.percentage >= 20) {
            return 2;
        } else if (this.percentage >= 10) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Updates the position of the health bar relative to the boss.
     * @param {Object} boss - The endboss object with x, y, width, height.
     */
    updatePosition(boss) {
        this.x = boss.x + boss.width / 2 - this.width / 2 + 30;
        this.y = boss.y + 70;
    }
}