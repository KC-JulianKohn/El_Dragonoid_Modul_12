class Character extends MovableObject {

    height = 300;
    width = 300;
    y = 140;
    speed = 5;
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
    world;

    constructor() {
        super().loadImage('./assets/img/2_character_dragon/2_walk/walk_00.png');
        this.loadImages(this.images_walk);
        this.animate();
    }


    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > -1000) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);


        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimations(this.images_walk);
            }
        }, 150);
    }



    jump() {

    }


}