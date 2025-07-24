class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    health = 100;
    lastHit = 0;


    playAnimations(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playDeadAnimation(images) {
        this.isControllable = false;
        if (!this.deadAnimationPlayed) {
            this.deadAnimationPlayed = true;

            let i = 0;
            let interval = setInterval(() => {
                if (i < images.length) {
                    let path = images[i];
                    this.img = this.imageCache[path];
                    i++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.y += 1000;
                    }, 5000);
                }
            }, 150);
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.health == 0;
    }
}