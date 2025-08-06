function getFreshLevel1() {
    return new Level(
        [
            new Knight_1(450),
            new Knight_1(1450),
            new Knight_1(2450),
            new Knight_1(3450),

            new Knight_2(450),
            new Knight_2(1450),
            new Knight_2(2450),
            new Knight_2(3450),

            new Knight_3(450),
            new Knight_3(1450),
            new Knight_3(2450),
            new Knight_3(3450),


            new Skeleton(1450),
            new Skeleton(2450),
            new Skeleton(3450),
            new Skeleton(3750),
            new Skeleton(4250),

            new Endboss()
        ],
        [
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, -1000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, -1000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, -1000, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 0, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 0, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 0, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 1000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 1000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 1000, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 2000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 2000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 2000, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 3000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 3000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 3000, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 4000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 4000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 4000, 0),
            new BackgroundObjekt('./assets/img/5_background/sky.png', 480, 5000, 0),
            new BackgroundObjekt('./assets/img/5_background/mountains.png', 480, 5000, 0),
            new BackgroundObjekt('./assets/img/5_background/ground.png', 480, 5000, 0)
        ],
        [
            new Treasure('./assets/img/8_treasure/treasure_01.png', 500),
            new Treasure('./assets/img/8_treasure/treasure_00.png', 971),
            new Treasure('./assets/img/8_treasure/treasure_03.png', 1332),
            new Treasure('./assets/img/8_treasure/treasure_02.png', 1390),
            new Treasure('./assets/img/8_treasure/treasure_03.png', 1748),
            new Treasure('./assets/img/8_treasure/treasure_01.png', 1976),
            new Treasure('./assets/img/8_treasure/treasure_03.png', 2083),
            new Treasure('./assets/img/8_treasure/treasure_00.png', 2223),
            new Treasure('./assets/img/8_treasure/treasure_01.png', 2602),
            new Treasure('./assets/img/8_treasure/treasure_01.png', 2965),
            new Treasure('./assets/img/8_treasure/treasure_03.png', 3076),
            new Treasure('./assets/img/8_treasure/treasure_02.png', 3311),
            new Treasure('./assets/img/8_treasure/treasure_01.png', 3708),
            new Treasure('./assets/img/8_treasure/treasure_00.png', 4302),
            new Treasure('./assets/img/8_treasure/treasure_01.png', 4490),
            new Treasure('./assets/img/8_treasure/treasure_02.png', 4571),
            new Treasure('./assets/img/8_treasure/treasure_03.png', 4750)
        ],
        [
            new Food('./assets/img/9_food/food_01.png', 921),
            new Food('./assets/img/9_food/food_00.png', 1736),
            new Food('./assets/img/9_food/food_01.png', 2121),
            new Food('./assets/img/9_food/food_00.png', 2841),
            new Food('./assets/img/9_food/food_01.png', 3673)
        ]
    );
}