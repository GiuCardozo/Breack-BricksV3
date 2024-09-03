export class Ball extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color, alpha) {
      super(scene, x, y, radius, 0, 360, false, color, alpha);
      
      this.newVelocityX = scene.velocidadX || 300;
      this.newVelocityY = scene.velocidadY || 300;

      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.body.setBounce(1, 1);
      this.body.setVelocity( this.newVelocityX,this.newVelocityY);
  
      this.body.onWorldBounds = true;
      
    };
    increaseSpeed(multiplier) {
       this.newVelocityX *=  multiplier;
       this.newVelocityY *=  multiplier;
      this.body.setVelocity(this.newVelocityX, this.newVelocityY);
    }
  }