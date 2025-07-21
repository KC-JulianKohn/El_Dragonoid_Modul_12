class BackgroundObjekt extends MovableObject{

    width = 1000;

    constructor(imgePath,height, x, y) {
        super().loadImage(imgePath);
        this.height = height;
        this.x = x;
        this.y = y;
    }
}