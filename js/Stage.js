import { Point } from "./Entities/Point.js";
import { Constants } from "./Utilities/Constants.js";

export class Stage {
  #floor;
  #earth;
  #bombs;

  #playerLocation;

  constructor(ctx, canvas) {
    const { width, height } = canvas;

    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.#bombs = new Array();
    this.#playerLocation = new Point(0, 0);

    this.#floor = "#109010";
    this.#earth = "#c78c26";
    this.logicalStage = this.#getDefaultStage();
  }

  #getDefaultStage() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  update() {
    this.#bombs.forEach((bomb) =>
      bomb.explode(
        this.logicalStage,
        this.#bombs.filter((b) => b !== bomb),
      ),
    );

    this.#bombs.forEach((bomb) => bomb.update(this.#playerLocation));

    this.#bombs = this.#bombs.filter((bomb) => !bomb.flameOut());
  }

  draw() {
    let color = "";
    for (let y = 0; y < this.logicalStage.length; y++) {
      for (let x = 0; x < this.logicalStage[y].length; x++) {
        if (this.logicalStage[y][x] == 0) {
          color = this.#floor;
        }
        if (this.logicalStage[y][x] == 1) {
          color = this.#earth;
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          x * Constants.TILE_SIZE,
          y * Constants.TILE_SIZE,
          Constants.TILE_SIZE,
          Constants.TILE_SIZE,
        );

        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(
          x * Constants.TILE_SIZE,
          y * Constants.TILE_SIZE,
          Constants.TILE_SIZE,
          Constants.TILE_SIZE,
        );

        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = "#333";
        this.ctx.fillText(`x: ${this.#playerLocation.x}`, 5, 20);
        this.ctx.fillText(`y: ${this.#playerLocation.y}`, 5, 30);
      }
    }

    this.#bombs.forEach((bomb) => bomb.draw());
  }

  addBomb(bomb) {
    this.#bombs.push(bomb);
  }

  getAmountBombs() {
    return this.#bombs.length;
  }

  setPlayerLocation(location) {
    this.#playerLocation = location;
  }
}
