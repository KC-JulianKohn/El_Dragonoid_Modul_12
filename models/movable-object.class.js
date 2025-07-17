class MovableObject {
    x = 50;
    y = 50;
    img;
    height = 150;
    width = 150;


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