class MovableObject extends DrawableObject {
    /** Speed of the object in units per frame */
    speed = 0.15;
    /** Whether the object is facing the opposite direction */
    otherDirection = false;
    /** Current health points */
    health = 5;
    /** Timestamp of the last hit */
    lastHit = 0;
    /** Damage this object can deal */
    damage = 5;
    /** Time in seconds during which the object is invincible after being hit */
    invisibility = 1;
    
    /**
     * Plays animations in a loop from the given images.
     * @param {Array<string>} images - Array of image paths.
     */
    playAnimations(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation sequence once and disables control during it.
     * @param {Array<string>} images - Array of image paths.
     * @param {Function} callback - Called after animation ends.
     */
    playAnimationOnce(images, callback) {
        this.isControllable = false;
        if (!this.animationPlayedOnce) {
            this.animationPlayedOnce = true;
            let i = 0;
            let interval = setInterval(() => {
                this.animationStep(images, i, interval, callback);
                i++;
            }, 150);
        }
    }

    /**
     * Handles a single step of the animation sequence.
     * @param {Array<string>} images - Array of image paths.
     * @param {number} index - Current image index.
     * @param {number} interval - Interval ID to clear when done.
     * @param {Function} callback - Called after animation ends.
     */
    animationStep(images, index, interval, callback) {
        if (GameManager.isPaused) return;
        if (index < images.length) {
            this.img = this.imageCache[images[index]];
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }

    /**
     * Resets single-play animation and re-enables control.
     */
    playAnimationReset() {
        this.animationPlayedOnce = false;
        this.isControllable = true;
        this.isAttacking = false;
    }

    /**
     * Plays dead animation and moves object out of view afterwards.
     * @param {Array<string>} images - Array of death image paths.
     */
    playDeadAnimation(images) {
        this.playAnimationOnce(images, () => {
            GameManager.addTimeout(() => {
                this.y += 3000;
            }, 1500);
        });
    }

    /** Moves object to the right. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves object to the left. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Moves object upwards. */
    moveUp() {
        this.y -= 2.5;
    }

    /** Moves object downwards. */
    moveDown() {
        this.y += 2.5;
    }

    /**
     * Applies damage to the object if not currently invincible.
     * @param {number} damage - Amount of damage to apply.
     */
    hit(damage) {
        if (this.isHurt()) return;
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently invincible after last hit.
     * @returns {boolean} True if object is still in invincibility period.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.invisibility;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if health is zero.
     */
    isDead() {
        return this.health == 0;
    }
}
