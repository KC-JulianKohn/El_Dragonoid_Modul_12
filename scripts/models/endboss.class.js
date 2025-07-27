class Endboss extends MovableObject {

    height = 300;
    width = 300;
    y = 140;
    health = 20;


    hitbox = {
        left: 120,
        right: 50,
        top: 130,
        bottom: 0
    };

    images_idle = [
        './assets/img/4_enemie_boss/1_idle/idle_00.png',
        './assets/img/4_enemie_boss/1_idle/idle_01.png',
        './assets/img/4_enemie_boss/1_idle/idle_02.png',
        './assets/img/4_enemie_boss/1_idle/idle_03.png',
        './assets/img/4_enemie_boss/1_idle/idle_04.png',
        './assets/img/4_enemie_boss/1_idle/idle_05.png',
        './assets/img/4_enemie_boss/1_idle/idle_06.png'
    ];
    images_hurt = [
        './assets/img/4_enemie_boss/3_hurt/hurt_00.png',
        './assets/img/4_enemie_boss/3_hurt/hurt_01.png',
        './assets/img/4_enemie_boss/3_hurt/hurt_02.png'
    ];
    images_dead = [
        './assets/img/4_enemie_boss/4_dead/dead_00.png',
        './assets/img/4_enemie_boss/4_dead/dead_01.png',
        './assets/img/4_enemie_boss/4_dead/dead_02.png',
        './assets/img/4_enemie_boss/4_dead/dead_03.png',
        './assets/img/4_enemie_boss/4_dead/dead_04.png',
        './assets/img/4_enemie_boss/4_dead/dead_05.png'
    ];


    constructor() {
        super().loadImage('./assets/img/4_enemie_boss/1_idle/idle_00.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.x = 4500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimations(this.images_hurt);
            } else
                this.playAnimations(this.images_idle);
        }, 250);
    }
}