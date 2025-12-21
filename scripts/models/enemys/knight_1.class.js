class Knight_1 extends MovableObject {
    /** Tracks whether the walking sound is currently playing */
    isWalkingSoundPlaying = false;
    /** Hitbox dimensions for collisions */
    hitbox = {
        left: 75,
        right: 10,
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

    /**
     * Creates a Knight_1 enemy instance at a randomized x position.
     * @param {number} x - Base horizontal spawn position.
     */
    constructor(x) {
        super().loadImage('./assets/img/3_enemies/night_1/1_walk/walk_00.png');
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walk);
        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.35;
    }

    /**
    * Starts the enemy behavior.
    */
    start() {
        this.animate();
    }

    /**
     * Registers movement and animation intervals.
     */
    animate() {
        GameManager.addInterval(() => this.handleMovementInterval(), 1000 / 60);
        GameManager.addInterval(() => this.handleAnimationInterval(), 250);
    }

    /**
     * Handles the movement and walking sound of the enemy.
     */
    handleMovementInterval() {
        if (this.world.isPaused) return;
        if (!this.isDead() && this.x - this.world.character.x <= 1100) {
            this.moveLeft();
            this.startWalkingSound();
        } else if (this.isDead()) {
            this.stopWalkingSound();
        }
    }

    /**
     * Handles the enemy animation frames based on state.
     */
    handleAnimationInterval() {
        if (this.world.isPaused) return;
        if (this.isDead()) {
            this.playDeadAnimation(this.images_dead);
        } else {
            this.playAnimations(this.images_walk);
        }
    }

    /**
     * Plays the walking sound if not already playing.
     */
    startWalkingSound() {
        if (!this.isWalkingSoundPlaying) {
            SoundHub.playSoundLoop(SoundHub.KNIGHTWALK, 0.4);
            this.isWalkingSoundPlaying = true;
        }
    }

    /**
     * Stops the walking sound if currently playing.
     */
    stopWalkingSound() {
        if (this.isWalkingSoundPlaying) {
            SoundHub.endOne(SoundHub.KNIGHTWALK);
            this.isWalkingSoundPlaying = false;
        }
    }
}