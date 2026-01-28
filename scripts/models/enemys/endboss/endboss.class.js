class Endboss extends MovableObject {
    /** Height of the boss sprite */
    height = 300;
    /** Width of the boss sprite */
    width = 300;
    /** Vertical position */
    y = 140;
    /** Horizontal position */
    x = 5250;
    /** Boss health points */
    health = 999999;
    /** Damage dealt to player */
    damage = 15;
    /** Movement speed */
    speed = 2;
    /** Array of active local timeouts */
    localTimeouts = [];
    /** Array of active local intervals */
    localIntervals = [];
    /** Timestamp of spawn */
    spawnTime = new Date().getTime();
    /** Tracks if boss was hurt in previous loop */
    wasHurtBefore = false;
    /** Prevents multiple move sets */
    playMoveSetRun = false;
    /** Whether the boss has been activated */
    activated = false;
    /** Boss immortality flag */
    immortal = true;
    /** Temporary invisibility counter */
    invisibility = 3;
    /** Hitbox dimensions */
    hitbox = {
        left: 120,
        right: 50,
        top: 130,
        bottom: 0
    };

    images_idle = [
        './assets/img/4_enemie_boss/1_idle/idle_00.png',
        './assets/img/4_enemie_boss/1_idle/idle_01.png',
        './assets/img/4_enemie_boss/1_idle/idle_02.png',
        './assets/img/4_enemie_boss/1_idle/idle_03.png',
        './assets/img/4_enemie_boss/1_idle/idle_04.png',
        './assets/img/4_enemie_boss/1_idle/idle_05.png',
        './assets/img/4_enemie_boss/1_idle/idle_06.png'
    ];

    images_walk = [
        './assets/img/4_enemie_boss/5_walk/walk_00.png',
        './assets/img/4_enemie_boss/5_walk/walk_01.png',
        './assets/img/4_enemie_boss/5_walk/walk_02.png',
        './assets/img/4_enemie_boss/5_walk/walk_03.png',
        './assets/img/4_enemie_boss/5_walk/walk_04.png',
        './assets/img/4_enemie_boss/5_walk/walk_05.png'
    ];

    images_attack = [
        './assets/img/4_enemie_boss/2_attack/attack_01.png',
        './assets/img/4_enemie_boss/2_attack/attack_02.png',
        './assets/img/4_enemie_boss/2_attack/attack_03.png',
        './assets/img/4_enemie_boss/2_attack/attack_04.png',
        './assets/img/4_enemie_boss/2_attack/attack_05.png',
        './assets/img/4_enemie_boss/2_attack/attack_06.png',
        './assets/img/4_enemie_boss/2_attack/attack_07.png',
        './assets/img/4_enemie_boss/2_attack/attack_08.png',
        './assets/img/4_enemie_boss/2_attack/attack_09.png',
        './assets/img/4_enemie_boss/2_attack/attack_10.png',
        './assets/img/4_enemie_boss/2_attack/attack_11.png',
        './assets/img/4_enemie_boss/2_attack/attack_12.png',
        './assets/img/4_enemie_boss/2_attack/attack_13.png',
        './assets/img/4_enemie_boss/2_attack/attack_14.png'
    ];

    images_hurt = [
        './assets/img/4_enemie_boss/3_hurt/hurt_00.png',
        './assets/img/4_enemie_boss/3_hurt/hurt_01.png',
        './assets/img/4_enemie_boss/3_hurt/hurt_02.png'
    ];

    images_dead = [
        './assets/img/4_enemie_boss/4_dead/dead_00.png',
        './assets/img/4_enemie_boss/4_dead/dead_01.png',
        './assets/img/4_enemie_boss/4_dead/dead_02.png',
        './assets/img/4_enemie_boss/4_dead/dead_03.png',
        './assets/img/4_enemie_boss/4_dead/dead_04.png',
        './assets/img/4_enemie_boss/4_dead/dead_05.png'
    ];

    /**
     * Initializes the boss and loads all images.
     */
    constructor() {
        super().loadImage('./assets/img/4_enemie_boss/1_idle/idle_00.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.animate();
    }

    /**
    * Starts the main animation loop.
    */
    animate() {
        this.addLocalInterval(() => this.handleAnimationLoop(), 250);
    }

    /**
     * Main animation loop executed in intervals.
     */
    handleAnimationLoop() {
        let currentlyHurt = this.isHurt();
        if (this.isDead()) {
            this.handleHurtOrDeath(false);
        } else if (currentlyHurt) {
            this.handleHurtOrDeath(true);
        } else {
            this.handlePhaseAnimations();
        }
        this.wasHurtBefore = currentlyHurt;
    }

    /**
     * Handles hurt and dead animations including sound effects.
     * @param {boolean} currentlyHurt - Whether the boss is currently hurt.
     */
    handleHurtOrDeath(currentlyHurt) {
        if (this.isDead()) {
            this.playMoveSetRun = false;
            this.playDeadAnimation(this.images_dead);
        } else if (currentlyHurt) {
            this.playAnimations(this.images_hurt);
            if (!this.wasHurtBefore) SoundHub.playSoundOne(SoundHub.BOSSHURT, 0.8);
        }
    }

    /**
     * Handles animations based on the current phase.
     */
    handlePhaseAnimations() {
        switch (this.currentPhase) {
            case 'pause':
                this.playAnimations(this.images_idle);
                break;
            case 'move':
                this.playAnimations(this.images_walk);
                break;
            case 'attack':
                break;
            default:
                this.playAnimations(this.images_idle);
                break;
        }
    }

    /**
     * Checks if the boss should activate based on player state and time.
     * @param {Object} character - Player character object.
     */
    checkActivation(character) {
        if (character.counters.kills >= 10 && character.counters.treasure >= 10 && this.immortal) {
            this.immortal = false;
            this.health = 50;
        }
        if (this.activated) return;
        let timePassed = new Date().getTime() - this.spawnTime;
        if (this.x - character.x <= 650 || timePassed >= 7 * 60 * 1000) {
            this.activated = true;
            this.playMoveSet();
        }
    }

    /**
     * Executes the boss's main move/attack loop.
     */
    playMoveSet() {
        if (this.playMoveSetRun && !this.activated) return;
        this.playMoveSetRun = true;
        SoundHub.endOne(SoundHub.BACKGROUNDMUSIC);
        SoundHub.playSoundLoop(SoundHub.BOSSFIGHT, 0.4);
        this.pausePhase(5000, () => {
            this.attackPhase(() => {
                this.movePhase(() => {
                    this.attackPhase(() => {
                        this.playMoveSetRun = false;
                        this.playMoveSet();
                    });
                });
            });
        });
    }

    /**
     * Pauses the boss for a set duration, then calls callback.
     * @param {number} duration - Pause duration in ms.
     * @param {Function} callback - Function to execute after pause.
     */
    pausePhase(duration, callback) {
        this.currentPhase = 'pause';
        this.addLocalTimeout(callback, duration);
    }

    /**
     * Starts the boss move phase over a fixed distance.
     * @param {Function} callback - Function to call when movement completes.
     */
    movePhase(callback) {
        SoundHub.playSoundLoop(SoundHub.BOSSWALK, 0.7);
        this.currentPhase = 'move';
        let distanceMoved = 0;
        let interval = this.createMoveInterval(distanceMoved, callback);
        this.localIntervals.push(interval);
    }

    /**
     * Creates an interval for moving the boss a fixed distance.
     * @param {number} distanceMoved - Initial distance moved (0).
     * @param {Function} callback - Function to call when movement completes.
     * @returns {number} Interval ID
     */
    createMoveInterval(distanceMoved, callback) {
        let interval = setInterval(() => {
            if (GameManager.isPaused) return;
            if (this.isDead()) {
                clearInterval(interval);
                return;
            }
            if (this.isHurt()) return;
            this.moveLeft();
            distanceMoved += this.speed;
            if (distanceMoved >= 300) {
                clearInterval(interval);
                callback();
            }
        }, 1000 / 60);
        return interval;
    }

    /**
     * Executes the boss attack phase and handles animations/hitbox.
     * @param {Function} callback - Function to call after attack completes.
     */
    attackPhase(callback) {
        SoundHub.endOne(SoundHub.BOSSWALK);
        SoundHub.playSoundOne(SoundHub.BOSSATTACK, 0.7);
        this.currentPhase = 'attack';
        this.isAttacking = true;
        this.originalHitbox = { ...this.hitbox };
        this.hitbox.left = this.originalHitbox.right - 55;
        this.hitbox.top = this.originalHitbox.top - 220;
        this.playAnimationOnce(this.images_attack, () => {
            this.hitbox = this.originalHitbox;
            this.isAttacking = false;
            this.playAnimationReset();
            if (callback) callback();
        });
    }

    /**
     * Registers a local timeout and tracks it.
     * @param {Function} callback - Function to execute after delay.
     * @param {number} delay - Delay in ms.
     * @returns {number} Timeout ID
     */
    addLocalTimeout(callback, delay) {
        let id = GameManager.addTimeout(callback, delay);
        this.localTimeouts.push(id);
        return id;
    }

    /**
    * Registers a local interval and tracks it.
    * @param {Function} callback - Function to execute repeatedly.
    * @param {number} delay - Interval delay in ms.
    * @returns {number} Interval ID
    */
    addLocalInterval(callback, delay) {
        let id = GameManager.addInterval(callback, delay);
        this.localIntervals.push(id);
        return id;
    }

    /**
     * Clears all local timeouts and intervals.
     */
    clearLocalTimers() {
        this.localTimeouts.forEach(id => clearTimeout(id));
        this.localIntervals.forEach(id => clearInterval(id));
        this.localTimeouts = [];
        this.localIntervals = [];
    }
}