class Endboss extends MovableObject {
    images_walk = [
        './assets/img/4_enemie_boss/1_walk/walk_00.png',
        './assets/img/4_enemie_boss/1_walk/walk_01.png',
        './assets/img/4_enemie_boss/1_walk/walk_02.png',
        './assets/img/4_enemie_boss/1_walk/walk_03.png',
        './assets/img/4_enemie_boss/1_walk/walk_04.png',
        './assets/img/4_enemie_boss/1_walk/walk_05.png'
    ];

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss/1_walk/walk_00.png');
        this.loadImages(this.images_walk);
        this.x = 700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimations(this.images_walk);
        }, 250);
    }




}