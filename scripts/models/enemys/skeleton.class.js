class Skeleton extends MovableObject {

    height = 150;
    width = 150;
    y = 290;
    health = 10;
    damage = 10;

    hitbox = {
        left: 50,
        right: 50,
        top: 50,
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
    images_hurt = [
        './assets/img/3_enemies/skeleton/3_hurt/hurt_00.png',
        './assets/img/3_enemies/skeleton/3_hurt/hurt_01.png',
        './assets/img/3_enemies/skeleton/3_hurt/hurt_02.png'
    ];
    images_dead = [
        './assets/img/3_enemies/skeleton/2_dead/dead_00.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_01.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_02.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_03.png',
        './assets/img/3_enemies/skeleton/2_dead/dead_04.png'
    ];


    constructor(x) {
        super().loadImage('./assets/img/3_enemies/skeleton/1_walk/walk_00.png');
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_hurt);
        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.35;
    }

    start() {
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.isPaused) return;

            if (!this.isDead() && this.x - this.world.character.x <= 1100) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                if (this.world.isPaused) return;
                
                this.playDeadAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimations(this.images_hurt);
            } else
                this.playAnimations(this.images_walk);
        }, 250);
    }

}