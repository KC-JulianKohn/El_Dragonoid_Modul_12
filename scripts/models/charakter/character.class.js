class Character extends MovableObject {
    /** Character height in pixels */
    height = 300;
    /** Character width in pixels */
    width = 300;
    /** Current vertical position */
    y = 140;
    /** Movement speed */
    speed = 5;
    /** Health points */
    health = 100;
    /** Reference to the game world */
    world;
    /** Whether player can control this character */
    isControllable = true;
    /** Flight state */
    isFlight = false;
    /** Walking state */
    isWalk = true;
    /** Character hitbox configuration */
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

    /**
     * Initializes the character, loads images and starts animation.
     */
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

    /**
     * Main animation loop setup. Adds movement and animation intervals.
     */
    animate() {
        GameManager.addInterval(() => this.handleMovement(), 1000 / 60);
        GameManager.addInterval(() => this.handleAnimations(), 150);
    }

    /**
     * Handles movement logic including vertical and horizontal movement.
     */
    handleMovement() {
        this.idleCheckSound();
        this.flightCheck();
        this.walkCheckSound();
        if (this.isControllable) {
            this.processVerticalMovement();
            this.processHorizontalMovement();
        }
        this.world.camera_x = -this.x + 150;
    }

    /**
    * Handles vertical movement based on keyboard input.
    */
    processVerticalMovement() {
        if (this.world.keyboard.UP && this.y > -50 && this.isFlight) this.moveUp();
        if (this.world.keyboard.DOWN && this.y < 140) this.moveDown();
    }

    /**
     * Handles horizontal movement and screen boundary checks.
     */
    processHorizontalMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > -800) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.x >= this.world.level.level_end_x) this.x -= 2;
    }

    /**
     * Controls character animation depending on state and input.
     */
    handleAnimations() {
        let currentlyHurt = this.isHurt();
        if (this.isDead()) this.playDeadAnimation(this.images_dead);
        else if (this.world.keyboard.UP && !this.isFlight) this.playRiseAnimation(this.images_rise);
        else if (this.world.keyboard.DOWN && this.y >= 140 && !this.isWalk) this.playLandingAnimation(this.images_landing);
        else if (this.isFlight && !this.isWalk) this.playAnimations(this.images_flight);
        else if (currentlyHurt) this.handleHurt();
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.playAnimations(this.images_walk);
        else if (this.world.keyboard.SPACE) this.playBitAttackAnimation(this.images_bite_attack);
        else if (this.world.keyboard.F && this.counters.food > 0 && !this.otherDirection) this.playFireAttackAnimation(this.images_fire_attack);
        else this.playAnimations(this.images_idle);
        this.wasHurtBefore = currentlyHurt;
    }

    /**
    * Plays hurt animation and sound if character is damaged.
    */
    handleHurt() {
        this.playAnimations(this.images_hurt);
        if (!this.wasHurtBefore) SoundHub.playSoundOne(SoundHub.DRAGONHURT, 0.8);
    }

    /**
    * Plays idle sound if character is not moving or attacking.
    */
    idleCheckSound() {
        if (this.y >= 140 && !this.isDead() && !this.isHurt() && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN && !this.world.keyboard.SPACE && !this.world.keyboard.F) {
            SoundHub.playSoundLoop(SoundHub.DRAGONBREATH, 0.2);
        } else {
            SoundHub.endOne(SoundHub.DRAGONBREATH);
        }
    }

    /**
     * Checks flight state and updates hitbox and flying sounds.
     */
    flightCheck() {
        if (!this.isAttacking) {
            if (this.y < 140) {
                SoundHub.playSoundLoop(SoundHub.DRAGONFLY, 1);
                this.hitbox.bottom = 110;
                this.hitbox.top = 120;
                this.hitbox.right = 20;
            } else {
                SoundHub.endOne(SoundHub.DRAGONFLY);
                this.hitbox.bottom = 0;
                this.hitbox.top = 190;
                this.hitbox.right = 55;
            }
        }
    }

    /**
     * Plays walking sound if character is moving on the ground.
     */
    walkCheckSound() {
        if (this.y >= 140) {
            if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
                SoundHub.playSoundLoop(SoundHub.DRAGONWALK, 1);
            } else {
                SoundHub.endOne(SoundHub.DRAGONWALK);
            }
        }
    }

    /**
     * Executes bite attack animation and updates hitbox.
     * @param {Array} images - Frames for bite attack.
     */
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

    /**
     * Executes fire attack animation and spawns fireball.
     * @param {Array} images - Frames for fire attack.
     */
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

    /**
     * Plays rising animation when character starts flying.
     * @param {Array} images - Frames for rising.
     */
    playRiseAnimation(images) {
        this.isFlight = true;
        this.isWalk = false;
        this.playAnimationOnce(images, () => { this.playAnimationReset(); });
    }

    /**
     * Plays landing animation when character stops flying.
     * @param {Array} images - Frames for landing.
     */
    playLandingAnimation(images) {
        this.isFlight = false;
        this.isWalk = true;
        SoundHub.playSoundOne(SoundHub.DRAGONLANDING, 0.8);
        this.playAnimationOnce(images, () => { this.playAnimationReset(); });
    }

    /**
    * Checks if character is currently hurt based on last hit timestamp.
    * @returns {boolean} True if hurt within last second.
    */
    isHurt() {
        let timepassed = Date.now() - this.lastHit;
        return timepassed < 1000;
    }
}