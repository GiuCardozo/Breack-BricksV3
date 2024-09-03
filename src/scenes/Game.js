import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  points;
  game_over_timeout;
  timer_event;

  init(data) {
    // Reset points
    this.points = data.points || 0;
    this.game_over_timeout = data.game_over_timeout || 99;

    // launch the HUD scene
    this.scene.launch("Hud", { remaining_time: this.game_over_timeout });

    // create a timmer event
    this.timmer_event = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.game_over_timeout--;
        this.scene.get("Hud").update_timeout(this.game_over_timeout);

        if (this.game_over_timeout === 0) {
          this.scene.stop("Hud");
          this.scene.start("GameOver");
        }
      },
    });
  }

  create() {
    // instanciar una nueva paleta.
    // crea un nuevo objeto
    // el this, aca, hace referencia a la escena
    this.ball = new Ball(this, 400, 300, 10, 0xffffff, 1);
    this.paddle = new Paddle(this, 400, 550, 300, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);

    // colisiones
    this.physics.add.collider(this.paddle, this.ball);

    this.physics.add.collider(
      this.ball,
      this.wall,
      (ball, brick) => {
        brick.hit();
      },
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("worldbounds");
      if (down) {
        console.log("hit bottom");
        this.scene.stop("Hud");
        this.scene.start("GameOver");
      }
    });
  }

  update() {
    this.paddle.update();
  }

  update_points(points) {
    this.points += points;
    this.scene.get("Hud").update_points(this.points);
  }
}