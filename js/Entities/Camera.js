import { Constants } from "../Utilities/Constants.js";

export class Camera {
  #floor;
  #earth;

  constructor(point, width, height, stage, ctx) {
    this.x = point.x;
    this.y = point.y;
    this.width = width;
    this.height = height;
    this.stage = stage;
    this.ctx = ctx;
    this.dx = 0;
    this.dy = 0;

    this.#floor = "#109010";
    this.#earth = "#c78c26";
  }

  draw() {
    let color = "";
    for (let y = this.y; y < this.height + this.y; y++) {
      for (let x = this.x; x < this.width + this.x; x++) {
        if (this.stage.logicalStage[y][x] == 0) {
          color = this.#floor;
        }
        if (this.stage.logicalStage[y][x] == 1) {
          color = this.#earth;
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

  update() {
    this.#move();
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

  #move() {}

  moveRight(speed) {
    const { x } = this.stage.playerLocation;
    const newX = Number.parseInt(this.x - x - speed);
    if (this.x - newX + this.width <= this.stage.logicalStage[0].length) {
      this.x -= newX;
    }
  }

  moveLeft(speed) {
    const { x } = this.stage.playerLocation;
    const newX = Number.parseInt(x - this.x + speed);
    if (this.x + newX >= 0) {
      this.x += newX;
    }
  }

  moveDown(speed) {
    const { y } = this.stage.playerLocation;
    const newY = Number.parseInt(this.y - y - speed);
    if (this.y - newY + this.height <= this.stage.logicalStage.length) {
      this.y -= newY;
    }
  }

  moveUp(speed) {
    const { y } = this.stage.playerLocation;
    const newY = Number.parseInt(this.y-y + speed);
    console.log(this.y + newY);
    if (this.y + newY >= 0) {
      this.y += newY;
    }
  }
}
