export class Paddle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color, alpha) {
    super(scene, x, y, width, height, color, alpha);

    
    scene.add.existing(this);

   
    scene.physics.add.existing(this);

    
    this.body.immovable = true;

    
    this.body.setCollideWorldBounds(true);

    //Usar mouse
    this.cursor = scene.input.keyboard.createCursorKeys();
    
    //Tomar mouse
    this.pointer = scene.input.activePointer;
  }

  update() {
    this.x = this.pointer.x;
    if (this.cursor.left.isDown) {
      this.body.setVelocityX(-300);
    } else if (this.cursor.right.isDown) {
      this.body.setVelocityX(300);
    } else {
      this.body.setVelocityX(0);
    }
  }
}
