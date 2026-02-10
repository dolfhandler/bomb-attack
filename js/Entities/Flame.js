import { Constants } from "../Utilities/Constants.js";

export class Flame {
  constructor(ctx, x, y) {
    const { TILE_SIZE } = Constants;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      this.x * Constants.TILE_SIZE,
      this.y * Constants.TILE_SIZE,
      this.width,
      this.height,
    );
  }
}
