class Character extends MovableObject {
    height = 300;
    width = 300;
    y = 140;
    speed = 5;
    health = 100;
    world;
    isControllable = true;
    isFlight = false;
    isWalk = true;

    hitbox = {
        left: 40,
        right: 55,
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
    images_rise = [
        './assets/img/2_character_dragon/3_rise/rise_00.png',
        './assets/img/2_character_dragon/3_rise/rise_01.png',
        './assets/img/2_character_dragon/3_rise/rise_02.png',
        './assets/img/2_character_dragon/3_rise/rise_03.png',
        './assets/img/2_character_dragon/3_rise/rise_04.png',
        './assets/img/2_character_dragon/3_rise/rise_05.png',
        './assets/img/2_character_dragon/3_rise/rise_06.png'
    ];
    images_flight = [
        './assets/img/2_character_dragon/4_flight/flight_00.png',
        './assets/img/2_character_dragon/4_flight/flight_01.png',
        './assets/img/2_character_dragon/4_flight/flight_02.png',
        './assets/img/2_character_dragon/4_flight/flight_03.png',
        './assets/img/2_character_dragon/4_flight/flight_04.png',
        './assets/img/2_character_dragon/4_flight/flight_05.png',
        './assets/img/2_character_dragon/4_flight/flight_06.png',
        './assets/img/2_character_dragon/4_flight/flight_07.png',
        './assets/img/2_character_dragon/4_flight/flight_08.png',
        './assets/img/2_character_dragon/4_flight/flight_09.png',
        './assets/img/2_character_dragon/4_flight/flight_10.png',
        './assets/img/2_character_dragon/4_flight/flight_11.png'
    ];
    images_landing = [
        './assets/img/2_character_dragon/5_landing/landing_00.png',
        './assets/img/2_character_dragon/5_landing/landing_01.png',
        './assets/img/2_character_dragon/5_landing/landing_02.png',
        './assets/img/2_character_dragon/5_landing/landing_03.png',
        './assets/img/2_character_dragon/5_landing/landing_04.png'
    ];
    images_fire_attack = [
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_00.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_01.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_02.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_03.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_04.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_05.png',
        './assets/img/2_character_dragon/6_fire_attack/fire_attack_06.png'
    ];
    images_bite_attack = [
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_00.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_01.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_02.png',
        './assets/img/2_character_dragon/7_bite_attack/bite_attack_03.png'
    ];
    images_hurt = [
        './assets/img/2_character_dragon/8_hurt/hurt_00.png',
        './assets/img/2_character_dragon/8_hurt/hurt_01.png',
        './assets/img/2_character_dragon/8_hurt/hurt_02.png',
        './assets/img/2_character_dragon/8_hurt/hurt_03.png'
    ];
    images_dead = [
        './assets/img/2_character_dragon/9_dead/dead_00.png',
        './assets/img/2_character_dragon/9_dead/dead_01.png',
        './assets/img/2_character_dragon/9_dead/dead_02.png'
    ];


    constructor() {
        super().loadImage('./assets/img/2_character_dragon/2_walk/walk_00.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_rise);
        this.loadImages(this.images_flight);
        this.loadImages(this.images_landing);
        this.loadImages(this.images_fire_attack);
        this.loadImages(this.images_bite_attack);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.animate();
    }

    animate() {
        GameManager.addInterval(() => {
            this.setFlightHitbox();
            if (this.isControllable) {
                if (this.world.keyboard.UP && this.y > -50 && this.isFlight) {
                    this.moveUp();
                }
                if (this.world.keyboard.DOWN && this.y < 140) {
                    this.moveDown();
                }
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.x > -800) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (this.x >= this.world.level.level_end_x) {
                    this.x -= 2;
                }
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);

        GameManager.addInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else if (this.world.keyboard.UP && !this.isFlight) {
                this.playRiseAnimation(this.images_rise);
            } else if (this.world.keyboard.DOWN && this.y >= 140 && !this.isWalk) {
                this.playLandingAnimation(this.images_landing);
            } else if (this.isFlight && !this.isWalk) {
                this.playAnimations(this.images_flight);
            } else if (this.isHurt()) {
                this.playAnimations(this.images_hurt);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimations(this.images_walk);
            } else if (this.world.keyboard.SPACE) {
                this.playBitAttackAnimation(this.images_bite_attack);
            } else if (this.world.keyboard.F && this.counters.food > 0 && !this.otherDirection) {
                this.playFireAttackAnimation(this.images_fire_attack);
            } else {
                this.playAnimations(this.images_idle);
            }
        }, 150);
    }

    setFlightHitbox() {
        if (!this.isAttacking) {
            if (this.y < 140) {
                this.hitbox.bottom = 110;
                this.hitbox.top = 120;
                this.hitbox.right = 20;
            } else {
                this.hitbox.bottom = 0;
                this.hitbox.top = 190;
                this.hitbox.right = 55;
            }
        }
    }

    playBitAttackAnimation(images) {
        if (!this.biteCooldown) { this.biteCooldown = 1500; }
        if (!this.lastBiteTime) { this.lastBiteTime = 0; }
        let now = GameManager.getCurrentTime();
        if (now - this.lastBiteTime < this.biteCooldown) return;
        this.lastBiteTime = now;
        this.isAttacking = true;

        this.originalHitbox = { ...this.hitbox };
        this.hitbox.right = this.originalHitbox.left - 20;
        SoundHub.playSoundOne(SoundHub.DRAGONBITE, 0.7);
        this.playAnimationOnce(images, () => {
            this.playAnimationReset();
            this.hitbox = this.originalHitbox;
        });
    }

    playFireAttackAnimation(images) {
        if (!this.fireCooldown) { this.fireCooldown = 5000; }
        if (!this.lastFireTime) { this.lastFireTime = 0; }
        let now = GameManager.getCurrentTime();
        if (now - this.lastFireTime < this.fireCooldown) return;
        this.lastFireTime = now;
        this.isAttacking = true;
        this.decreaseCounter("food", 1)
        SoundHub.playSoundOne(SoundHub.DRAGONBREATHINGFIRE, 0.5);
        this.playAnimationOnce(images, () => { this.playAnimationReset(); });
        GameManager.addTimeout(() => {
            if (!this.world.fireball) {
                this.world.fireball = new Fireball(this);
            }
        }, 700);
    }

    playRiseAnimation(images) {
        this.isFlight = true;
        this.isWalk = false;
        this.playAnimationOnce(images, () => { this.playAnimationReset(); });
    }

    playLandingAnimation(images) {
        this.isFlight = false;
        this.isWalk = true;
        this.playAnimationOnce(images, () => { this.playAnimationReset(); });
    }

    isHurt() {
        let timepassed = Date.now() - this.lastHit;
        return timepassed < 1000;
    }
}