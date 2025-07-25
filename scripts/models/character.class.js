class Character extends MovableObject {

    isControllable = true;
    height = 300;
    width = 300;
    y = 140;
    speed = 5;
    world;

    hitbox = {
        left: 30,
        right: 30,
        top: 190,
        bottom: 0
    };

    images_idle = [
        './assets/img/2_character_dragon/1_idle/idle_00.png',
        './assets/img/2_character_dragon/1_idle/idle_01.png',
        './assets/img/2_character_dragon/1_idle/idle_02.png',
        './assets/img/2_character_dragon/1_idle/idle_03.png',
        './assets/img/2_character_dragon/1_idle/idle_04.png',
        './assets/img/2_character_dragon/1_idle/idle_05.png',
        './assets/img/2_character_dragon/1_idle/idle_06.png'
    ];
    images_walk = [
        './assets/img/2_character_dragon/2_walk/walk_00.png',
        './assets/img/2_character_dragon/2_walk/walk_01.png',
        './assets/img/2_character_dragon/2_walk/walk_02.png',
        './assets/img/2_character_dragon/2_walk/walk_03.png',
        './assets/img/2_character_dragon/2_walk/walk_04.png',
        './assets/img/2_character_dragon/2_walk/walk_05.png',
        './assets/img/2_character_dragon/2_walk/walk_06.png',
        './assets/img/2_character_dragon/2_walk/walk_07.png',
        './assets/img/2_character_dragon/2_walk/walk_08.png',
        './assets/img/2_character_dragon/2_walk/walk_09.png',
        './assets/img/2_character_dragon/2_walk/walk_10.png',
        './assets/img/2_character_dragon/2_walk/walk_11.png'
    ];
    images_bite_attack = [
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_00.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_01.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_02.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_03.png'
    ];
    images_dead = [
        './assets/img/2_character_dragon/9_dead/dead_00.png',
        './assets/img/2_character_dragon/9_dead/dead_01.png',
        './assets/img/2_character_dragon/9_dead/dead_02.png',
    ];
    images_hurt = [
        './assets/img/2_character_dragon/8_hurt/hurt_00.png',
        './assets/img/2_character_dragon/8_hurt/hurt_01.png',
        './assets/img/2_character_dragon/8_hurt/hurt_02.png',
        './assets/img/2_character_dragon/8_hurt/hurt_03.png',
    ];

    constructor() {
        super().loadImage('./assets/img/2_character_dragon/2_walk/walk_00.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_bite_attack);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.isControllable) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.x > -1000) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimations(this.images_hurt);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimations(this.images_walk);
            } else {
                this.playAnimations(this.images_idle);
            }
        }, 150);
    }
}