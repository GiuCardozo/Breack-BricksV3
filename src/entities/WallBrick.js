import { Brick } from "./Brick";
export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.createWall();
  }

  createWall() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        let isBallCreator = Phaser.Math.Between(0, 10) > 7;
        let isBoomCreator= Phaser.Math.Between(0, 10) > 5;
        let brick = new Brick(
          this.scene,
          40 + i * 100,
          40 + j * 50,
          60,
          20,
          0xffffff,
          1,
          isBallCreator ,
          isBoomCreator,
        );
        this.add(brick);
      }
    }
  }
}