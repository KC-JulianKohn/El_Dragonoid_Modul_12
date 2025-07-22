class Endboss extends MovableObject {
    
    height = 300;
    width = 300;
    y = 140;
    
    images_walk = [
        './assets/img/4_enemie_boss/1_idle/idle_00.png',
        './assets/img/4_enemie_boss/1_idle/idle_01.png',
        './assets/img/4_enemie_boss/1_idle/idle_02.png',
        './assets/img/4_enemie_boss/1_idle/idle_03.png',
        './assets/img/4_enemie_boss/1_idle/idle_04.png',
        './assets/img/4_enemie_boss/1_idle/idle_05.png',
        './assets/img/4_enemie_boss/1_idle/idle_06.png'
    ];

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss/1_idle/idle_00.png');
        this.loadImages(this.images_walk);
        this.x = 4500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimations(this.images_walk);
        }, 250);
    }




}