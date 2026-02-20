import { Camera } from "./Entities/Camera.js";
import { Player } from "./Entities/Player.js";
import { Point } from "./Entities/Point.js";
import { Input } from "./Input.js";
import { Stage } from "./Stage.js";

export class Game {
  constructor(ctxList, canvas) {
    const { width, height } = canvas;
    const [ctx, ctx2] = ctxList;
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.input = new Input();
    this.stage = new Stage(ctx, canvas);
    this.camera = new Camera(new Point(6, 4), 14, 10, this.stage, ctx2);
    this.player = new Player(ctx, 7, 5, this.camera);
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

    this.camera.draw();
    this.stage.draw();
    this.player.draw();
  }
}
