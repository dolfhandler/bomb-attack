import { Constants } from "../Utilities/Constants.js";

export class Camera {
  #floor;
  #earth;
  #bomb;
  #flame;

  constructor(point, width, height, stage, ctx) {
    this.x = point.x;
    this.y = point.y;
    this.width = width;
    this.height = height;
    this.stage = stage;
    this.ctx = ctx;

    this.#floor = "#109010";
    this.#earth = "#c78c26";
    this.#bomb = "#111";
    this.#flame = "#900";
  }

  draw() {
    let color = "";

    const stageWidth = this.stage.logicalStage[0].length;
    const stageHeight = this.stage.logicalStage.length;
    console.log("anchoxalto", stageWidth, stageHeight);

    let yInit = Number.parseInt(this.y);
    let xInit = Number.parseInt(this.x);
    let ySize = Number.parseInt(this.y + this.height);
    let xSize = Number.parseInt(this.x + this.width);

    yInit = ySize > stageHeight ? stageHeight - this.height : yInit;
    xInit = xSize > stageWidth ? stageWidth - this.width : xInit;
    ySize = Math.min(ySize, stageHeight);
    xSize = Math.min(xSize, stageWidth);

    console.log(xInit, yInit, xSize, ySize);

    for (let y = yInit; y < ySize; y++) {
      for (let x = xInit; x < xSize; x++) {
        if (this.stage.logicalStage[y][x] == 0) {
          color = this.#floor;
        }
        if (this.stage.logicalStage[y][x] == 1) {
          color = this.#earth;
        }
        if (this.stage.logicalStage[y][x] == 2) {
          color = this.#bomb;
        }

        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          (x - this.x) * Constants.TILE_SIZE,
          (y - this.y) * Constants.TILE_SIZE,
          Constants.TILE_SIZE,
          Constants.TILE_SIZE,
        );
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(
          (x - this.x) * Constants.TILE_SIZE,
          (y - this.y) * Constants.TILE_SIZE,
          Constants.TILE_SIZE,
          Constants.TILE_SIZE,
        );
      }
    }

    this.#drawPlayer(this.stage.playerLocation);
  }

  #drawPlayer(playerLocation) {
    const { x, y } = playerLocation;
    this.ctx.fillStyle = "#0D0";
    this.ctx.fillRect(
      (x - this.x) * Constants.TILE_SIZE,
      (y - this.y) * Constants.TILE_SIZE,
      Constants.TILE_SIZE,
      Constants.TILE_SIZE,
    );
  }

  move(speedX, speedY) {
    const stageWidth = this.stage.logicalStage[0].length;
    const stageHeight = this.stage.logicalStage.length;
    
    let ySize = Number.parseInt(this.y + speedY + this.height);
    let xSize = Number.parseInt(this.x + speedX + this.width);

    if (xSize > stageWidth) {
      speedX = 0;
    }
    if (ySize > stageHeight) {
      speedY = 0;
    }
    if (this.x + speedX < 0) {
      speedX = 0;
    }
    if (this.y + speedY < 0) {
      speedY = 0;
    }

    this.x += speedX;
    this.y += speedY;
  }
}
