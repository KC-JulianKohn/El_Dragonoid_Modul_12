class Knight_1 extends MovableObject {

    hitbox = {
        left: 55,
        right: 5,
        top: 55,
        bottom: 0
    };

    images_walk = [
        './assets/img/3_enemies/night_1/1_walk/walk_00.png',
        './assets/img/3_enemies/night_1/1_walk/walk_01.png',
        './assets/img/3_enemies/night_1/1_walk/walk_02.png',
        './assets/img/3_enemies/night_1/1_walk/walk_03.png',
        './assets/img/3_enemies/night_1/1_walk/walk_04.png',
        './assets/img/3_enemies/night_1/1_walk/walk_05.png',
        './assets/img/3_enemies/night_1/1_walk/walk_06.png',
        './assets/img/3_enemies/night_1/1_walk/walk_07.png'
    ];
    images_dead = [
        './assets/img/3_enemies/night_1/2_dead/dead_00.png',
        './assets/img/3_enemies/night_1/2_dead/dead_01.png',
        './assets/img/3_enemies/night_1/2_dead/dead_02.png',
        './assets/img/3_enemies/night_1/2_dead/dead_03.png',
        './assets/img/3_enemies/night_1/2_dead/dead_04.png',
        './assets/img/3_enemies/night_1/2_dead/dead_05.png'
    ];


    constructor(x) {
        super().loadImage('./assets/img/3_enemies/night_1/1_walk/walk_00.png');
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walk);
        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.35;
    }

    start() {
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead() && this.x - this.world.character.x <= 800) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else
                this.playAnimations(this.images_walk);
        }, 250);
    }
}