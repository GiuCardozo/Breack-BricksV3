export class Control {
    constructor(scene) {
      super(scene);
      this.scene = scene;
      this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
  }