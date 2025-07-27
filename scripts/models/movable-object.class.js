class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    health = 5;
    lastHit = 0;


    playAnimations(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images,  callback) {
        this.isControllable = false;
        if (!this.animationPlayedOnce) {
            this.animationPlayedOnce = true;

            let i = 0;
            let interval = setInterval(() => {
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

    playDeadAnimation(images) {
        this.playAnimationOnce(images, () => {
            setTimeout(() => {
                this.y += 1000;
            }, 3000);
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(mo) {
        return this.x + this.width - this.hitbox.right > mo.x + mo.hitbox.left &&
            this.y + this.height - this.hitbox.bottom > mo.y + mo.hitbox.top &&
            this.x + this.hitbox.left < mo.x + mo.width - mo.hitbox.right &&
            this.y + this.hitbox.top < mo.y + mo.height - mo.hitbox.bottom
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