class Skeleton extends MovableObject {
    /** Tracks whether the walking sound is currently playing */
    isWalkingSoundPlaying = false;
    /** Tracks if the skeleton was hurt in the previous frame */
    wasHurtBefore = false;
    /** Vertical size of the skeleton */
    height = 150;
    /** Horizontal size of the skeleton */
    width = 150;
    /** Vertical position */
    y = 290;
    /** Skeleton health points */
    health = 10;
    /** Damage dealt by skeleton */
    damage = 10;
    /** Hitbox dimensions for collisions */
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

    /**
     * Creates a skeleton enemy at a randomized x position.
     * @param {number} x - Base horizontal spawn position.
     */
    constructor(x) {
        super().loadImage('./assets/img/3_enemies/skeleton/1_walk/walk_00.png');
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_hurt);
        this.x = x + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.35;
    }

    /**
     * Starts the skeleton's behavior.
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
     * Handles the movement and walking sound of the skeleton enemy.
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
     * Handles the skeleton's animation frames and hurt/dead logic.
     */
    handleAnimationInterval() {
        if (this.world.isPaused) return;
        let currentlyHurt = this.isHurt();
        if (this.isDead()) {
            this.playDeadAnimation(this.images_dead);
        } else if (currentlyHurt) {
            this.playAnimations(this.images_hurt);
            if (!this.wasHurtBefore) {
                SoundHub.playSoundOne(SoundHub.SKELETONDEAD, 0.4);
            }
        } else {
            this.playAnimations(this.images_walk);
        }
        this.wasHurtBefore = currentlyHurt;
    }

    /**
    * Plays the walking sound if not already playing.
    */
    startWalkingSound() {
        if (!this.isWalkingSoundPlaying) {
            SoundHub.playSoundLoop(SoundHub.SELETONWALK, 0.2);
            this.isWalkingSoundPlaying = true;
        }
    }

    /**
     * Stops the walking sound if currently playing.
     */
    stopWalkingSound() {
        if (this.isWalkingSoundPlaying) {
            SoundHub.endOne(SoundHub.SELETONWALK);
            this.isWalkingSoundPlaying = false;
        }
    }
}