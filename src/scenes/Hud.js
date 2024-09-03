import { Scene } from "phaser";

// The HUD scene is the scene that shows the points and the remaining time.
export class Hud extends Scene {
  remaining_time = 0;

  remaining_time_text;
  points_text;

  constructor() {
    super("Hud");
  }

  init(data) {
    // fadeIn([duration], [red], [green], [blue], [callback], [context])
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.remaining_time = data.remaining_time;
  }

  create() {
    this.points_text = this.add.text(10, 10, "POINTS:0000", {
      fontSize: "24px",
      color: "#ffffff",
    });

    this.remaining_time_text = this.add.text(
      this.scale.width - 200,
      10,
      `REMAINING:${this.remaining_time.toString().padStart(2, "0")}s`,
      {
        fontSize: "24px",
        color: "#ffffff",
      }
    );
  }

  update_points(points) {
    this.points_text.setText(`POINTS:${points.toString().padStart(4, "0")}`);
  }

  update_timeout(timeout) {
    this.remaining_time_text.setText(
      `REMAINING:${timeout.toString().padStart(2, "0")}s`
    );
  }
}