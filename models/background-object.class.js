class BackgroundObjekt extends MovableObject{

    width = 720;

    constructor(imgePath,height, x, y) {
        super().loadImage(imgePath);
        this.height = height;
        this.x = x;
        this.y = y;
    }


}