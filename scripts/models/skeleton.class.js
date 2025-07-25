class Skeleton extends MovableObject {

    height = 150;
    width = 150;
    y = 290;

    hitbox = {
        left: 20,
        right: 30,
        top: 35,
        bottom: 0
    };

    images_walk = [
        './assets/img/3_enemies/skeleton/1_walk/walk_00.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_01.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_02.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_03.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_04.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_05.png',
        './assets/img/3_enemies/skeleton/1_walk/walk_06.png'
    ];
    images_dead = [
        './assets/img/3_enemies/skeleton/2_dead/dead_00.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_01.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_02.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_03.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_04.png'
    ];


    constructor() {
        super().loadImage('./assets/img/3_enemies/skeleton/1_walk/walk_00.png');
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walk);
        this.x = 450 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimations(this.images_walk);
        }, 250);
    }

}