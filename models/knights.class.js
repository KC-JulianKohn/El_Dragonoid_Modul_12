class Knight extends MovableObject {


    constructor() {
        super().loadImage('./assets/img/3_enemies/night_1/1_walk/walk_00.png');

        this.x = 250 + Math.random() *400;
    }

}