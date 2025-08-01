class Endboss extends MovableObject {

    height = 300;
    width = 300;
    y = 140;
    x = 5250;
    health = 999999;
    damage = 15;
    speed = 0.5;
    spawnTime = new Date().getTime();
    playMoveSetRun = false;
    activated = false;
    immortal = true;

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


    constructor() {
        super().loadImage('./assets/img/4_enemie_boss/1_idle/idle_00.png');
        this.loadImages(this.images_idle);
        this.loadImages(this.images_walk);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.images_dead);
            } else if (this.isHurt()) {
                this.playAnimations(this.images_hurt);
            } else
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
        }, 250);
    }

    checkActivation(character) {
        if (character.counters.kills >= 10 && character.counters.treasure >= 10 && this.immortal) {
            this.immortal = false;
            this.health = 25;
        }

        if (this.activated) return;

        let timePassed = new Date().getTime() - this.spawnTime;

        if (this.x - character.x <= 650 || timePassed >= 5 * 60 * 1000) {
            this.activated = true;
            this.playMoveSet();
        }
    }

    playMoveSet() {
        if (this.playMoveSetRun) return;

        this.playMoveSetRun = true;

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

    pausePhase(duration, callback) {
        this.currentPhase = 'pause';
        setTimeout(() => {
            callback();
        }, duration);
    }

    movePhase(callback) {
        this.currentPhase = 'move';
        let distanceMoved = 0;

        let interval = setInterval(() => {
            if (this.isDead()) {
                clearInterval(interval);
                return;
            }

            if (this.isHurt()) return;

            this.moveLeft();
            distanceMoved += this.speed;

            if (distanceMoved >= 150) {
                clearInterval(interval);
                callback();
            }
        }, 1000 / 60);
    }

    attackPhase(callback) {
        this.currentPhase = 'attack';
        this.isAttacking = true;
        this.originalHitbox = { ...this.hitbox };
        this.hitbox.left = this.originalHitbox.right - 55;
        this.hitbox.top = this.originalHitbox.top - 220;

        this.playAnimationOnce(this.images_attack, () => {
            this.hitbox = this.originalHitbox;
            this.playAnimationReset();
            if (callback) callback();
        });
    }
}