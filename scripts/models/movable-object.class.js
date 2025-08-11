class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    health = 5;
    lastHit = 0;
    damage = 5;
    invisibility = 1;

    playAnimations(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images, callback) {
        this.isControllable = false;
        if (!this.animationPlayedOnce) {
            this.animationPlayedOnce = true;

            let i = 0;
            let interval = setInterval(() => {
                if (GameManager.isPaused) return;
                if (i < images.length) {
                    this.img = this.imageCache[images[i]];
                    i++;
                } else {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, 150);
        }
    }

    playAnimationReset() {
        this.animationPlayedOnce = false;
        this.isControllable = true;
        this.isAttacking = false;
    }

    playDeadAnimation(images) {
        this.playAnimationOnce(images, () => {
            GameManager.addTimeout(() => {
                this.y += 3000;
            }, 1500);
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        this.y -= 2.5;
    }

    moveDown() {
        this.y += 2.5;
    }

    hit(damage) {
        if (this.isHurt()) return;
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < this.invisibility;
    }

    isDead() {
        return this.health == 0;
    }
}