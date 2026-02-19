import { Constants } from "../Utilities/Constants.js";
import { Point } from "./Point.js";

export class Flame {
  constructor(ctx, point) {
    const { TILE_SIZE } = Constants;
    this.ctx = ctx;
    this.x = point.x;
    this.y = point.y;
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

  hitPlayer(playerLocation) {
    const { x, y } = playerLocation;

    const pointsToEvaluate = new Array();
    pointsToEvaluate.push(new Point(Math.floor(x), Math.floor(y)));
    pointsToEvaluate.push(new Point(Math.ceil(x), Math.ceil(y)));
    pointsToEvaluate.push(new Point(Math.floor(x), Math.ceil(y)));
    pointsToEvaluate.push(new Point(Math.ceil(x), Math.floor(y)));

    pointsToEvaluate.forEach((point) => {
      if (this.#checkPointsAreEquals(point, Point.fromEntity(this))) {
        console.log("hit player");
        return;
      }
    });
  }

  #checkPointsAreEquals(playerPoint, flamePoint) {
    return playerPoint.equals(flamePoint);
  }
}
