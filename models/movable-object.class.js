class MovableObject {
    x = 0;
    y = 240;
    img;
    height = 120;
    width = 120;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }

}