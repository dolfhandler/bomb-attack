import { Player } from "./Entities/Player.js";
import { Input } from "./Input.js";
import { Stage } from "./Stage.js";

export class Game {
  constructor(ctx, canvas) {
    const { width, height } = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.input = new Input();
    this.stage = new Stage(ctx, canvas);
    this.player = new Player(ctx, 1, 2);
  }

  start() {
    console.log("start...");
    requestAnimationFrame(() => this.loop());
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  update() {
    this.stage.update();
    this.player.update(this.input, this.stage);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.stage.draw();
    this.player.draw();
  }
}
