class Fireball extends MovableObject {

    speed = 6;
    y = 360;
    height = 100;
    width = 150;
    damage = 10;
    hasExploded = false;

    hitbox = {
        left: 40,
        right: 40,
        top: 40,
        bottom: 30
    };

    images_fireball = [
        './assets/img/6_fireball/1_fireball/fireball_00.png',
        './assets/img/6_fireball/1_fireball/fireball_01.png',
        './assets/img/6_fireball/1_fireball/fireball_02.png',
        './assets/img/6_fireball/1_fireball/fireball_03.png',
        './assets/img/6_fireball/1_fireball/fireball_04.png',
        './assets/img/6_fireball/1_fireball/fireball_05.png',
        './assets/img/6_fireball/1_fireball/fireball_06.png',
        './assets/img/6_fireball/1_fireball/fireball_07.png',
        './assets/img/6_fireball/1_fireball/fireball_08.png',
        './assets/img/6_fireball/1_fireball/fireball_09.png',
        './assets/img/6_fireball/1_fireball/fireball_10.png',
        './assets/img/6_fireball/1_fireball/fireball_11.png',
        './assets/img/6_fireball/1_fireball/fireball_12.png',
        './assets/img/6_fireball/1_fireball/fireball_13.png',
        './assets/img/6_fireball/1_fireball/fireball_14.png',
        './assets/img/6_fireball/1_fireball/fireball_15.png',
        './assets/img/6_fireball/1_fireball/fireball_16.png',
        './assets/img/6_fireball/1_fireball/fireball_17.png',
        './assets/img/6_fireball/1_fireball/fireball_18.png',
        './assets/img/6_fireball/1_fireball/fireball_19.png',
        './assets/img/6_fireball/1_fireball/fireball_20.png',
        './assets/img/6_fireball/1_fireball/fireball_21.png',
        './assets/img/6_fireball/1_fireball/fireball_22.png',
        './assets/img/6_fireball/1_fireball/fireball_23.png',
        './assets/img/6_fireball/1_fireball/fireball_24.png',
        './assets/img/6_fireball/1_fireball/fireball_25.png',
        './assets/img/6_fireball/1_fireball/fireball_26.png',
        './assets/img/6_fireball/1_fireball/fireball_27.png',
        './assets/img/6_fireball/1_fireball/fireball_28.png',
        './assets/img/6_fireball/1_fireball/fireball_29.png',
        './assets/img/6_fireball/1_fireball/fireball_30.png',
        './assets/img/6_fireball/1_fireball/fireball_31.png',
        './assets/img/6_fireball/1_fireball/fireball_32.png',
        './assets/img/6_fireball/1_fireball/fireball_33.png',
        './assets/img/6_fireball/1_fireball/fireball_34.png',
        './assets/img/6_fireball/1_fireball/fireball_35.png',
        './assets/img/6_fireball/1_fireball/fireball_36.png',
        './assets/img/6_fireball/1_fireball/fireball_37.png',
        './assets/img/6_fireball/1_fireball/fireball_38.png',
        './assets/img/6_fireball/1_fireball/fireball_39.png'
    ];
    images_explosion = [
        './assets/img/6_fireball/2_explosion/explosion_01.png',
        './assets/img/6_fireball/2_explosion/explosion_02.png',
        './assets/img/6_fireball/2_explosion/explosion_03.png',
        './assets/img/6_fireball/2_explosion/explosion_04.png',
        './assets/img/6_fireball/2_explosion/explosion_05.png',
        './assets/img/6_fireball/2_explosion/explosion_06.png',
        './assets/img/6_fireball/2_explosion/explosion_07.png',
        './assets/img/6_fireball/2_explosion/explosion_08.png',
        './assets/img/6_fireball/2_explosion/explosion_09.png',
        './assets/img/6_fireball/2_explosion/explosion_10.png',
        './assets/img/6_fireball/2_explosion/explosion_11.png'
    ];

    constructor(character) {
        super().loadImage('./assets/img/6_fireball/1_fireball/fireball_00.png');
        this.loadImages(this.images_fireball);
        this.loadImages(this.images_explosion);
        this.character = character;
        this.world = character.world;
        this.x = character.x + 120;
        this.animate();
    }

    animate() {
        GameManager.addInterval(() => {
            if (this.world.isPaused) return;

            if (!this.hasExploded && !this.explode()) {
                this.moveRight();
            }
        }, 1000 / 60);

        GameManager.addInterval(() => {
            if (this.world.isPaused) return;

            if (!this.hasExploded) {
                this.playAnimations(this.images_fireball);
            } else {
                this.playAnimationOnce(this.images_explosion, () => {
                    this.world.fireball = null;
                });
            }
        }, 100);

        GameManager.addInterval(() => {
            if (this.world.isPaused) return;
            this.expandExplosion();
        }, 100);
    }

    expandExplosion() {
        if (this.hasExploded) {
            let elapsed = GameManager.getCurrentTime() - this.explosionStart;
            let progress = Math.min(elapsed / this.explosionGrowTime, 1);

            let newSize = this.originalSize + (this.explosionMaxSize - this.originalSize) * progress;

            this.x = this.x + (this.width - newSize) * 0.3;
            this.y = this.y + (this.height - newSize) / 2;
            this.width = newSize;
            this.height = newSize;
        }
    }

    explode() {
        return this.world.level.enemies.some(enemy =>
            this.isColliding(enemy) && !enemy.isDead()
        );
    }

    triggerExplosion() {
        this.hasExploded = true;
        this.explosionStart = GameManager.getCurrentTime();
        this.explosionMaxSize = 230;
        this.originalSize = this.width;
        this.explosionGrowTime = 1000;
        this.speedX = 0;
        this.speedY = 0;
    }
}