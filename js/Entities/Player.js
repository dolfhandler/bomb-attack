import { Bomb } from "./Bomb.js";
import { Point } from "./Point.js";
import { Constants } from "../Utilities/Constants.js";

export class Player {
  #COLORS = {
    RIGHT: "#A00000",
    DOWN: "#1199d8",
    LEFT: "#800461",
    UP: "#a04d00",
  };

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = this.#COLORS.DOWN;
    this.width = 40;
    this.height = 40;
    this.speed = 0.25;
    this.bombsAllowed = 100;
  }

  update(input, stage) {
    this.#move(input, stage);
    this.#plantABomb(input, stage);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x * Constants.TILE_SIZE,
      this.y * Constants.TILE_SIZE,
      this.width,
      this.height,
    );

    this.ctx.font = "14px Arial";
    this.ctx.fillStyle = "#333";
    this.ctx.fillText(
      `x: ${this.x}`,
      this.x * Constants.TILE_SIZE + 10,
      this.y * Constants.TILE_SIZE + 20,
    );
    this.ctx.fillText(
      `y: ${this.y}`,
      this.x * Constants.TILE_SIZE + 10,
      this.y * Constants.TILE_SIZE + 30,
    );
  }

  #move(input, stage) {
    if (input.keys["ArrowRight"]) {
      if (!this.#isCollidingWhenMovingRight(stage)) {
        this.#moveRight(input, stage);
      }
    }

    if (input.keys["ArrowLeft"]) {
      if (!this.#isCollidingWhenMovingLeft(stage)) {
        this.#moveLeft(input, stage);
      }
    }

    if (input.keys["ArrowDown"]) {
      if (!this.#isCollidingWhenMovingDown(stage)) {
        this.#moveDown(input, stage);
      }
    }

    if (input.keys["ArrowUp"]) {
      if (!this.#isCollidingWhenMovingUp(stage)) {
        this.#moveUp(input, stage);
      }
    }
  }

  #isCollidingWhenMovingRight(stage) {
    return (
      this.#checkNormalCollisionToRight(stage) ||
      this.#checkIntermediateCollisionToRight(stage)
    );
  }

  #checkNormalCollisionToRight(stage) {
    return this.#detectCollision(
      stage,
      new Point(this.x + this.speed + (1 - this.speed), this.y),
    );
  }

  #checkIntermediateCollisionToRight(stage) {
    return this.#detectCollision(
      stage,
      new Point(this.x + this.speed + (1 - this.speed), Math.ceil(this.y)),
    );
  }

  #isCollidingWhenMovingLeft(stage) {
    return (
      this.#checkNormalCollisionToLeft(stage) ||
      this.#checkIntermediateCollisionToLeft(stage)
    );
  }

  #checkNormalCollisionToLeft(stage) {
    return this.#detectCollision(stage, new Point(this.x - this.speed, this.y));
  }

  #checkIntermediateCollisionToLeft(stage) {
    return this.#detectCollision(
      stage,
      new Point(Math.floor(this.x - this.speed), Math.ceil(this.y)),
    );
  }

  #isCollidingWhenMovingDown(stage) {
    return (
      this.#checkNormalCollisionToDown(stage) ||
      this.#checkIntermediateCollisionToDown(stage)
    );
  }

  #checkNormalCollisionToDown(stage) {
    return this.#detectCollision(
      stage,
      new Point(this.x, this.y + this.speed + (1 - this.speed)),
    );
  }

  #checkIntermediateCollisionToDown(stage) {
    return this.#detectCollision(
      stage,
      new Point(Math.ceil(this.x), this.y + this.speed + (1 - this.speed)),
    );
  }

  #isCollidingWhenMovingUp(stage) {
    return (
      this.#checkNormalCollisionToUp(stage) ||
      this.#checkIntermediateCollisionToUp(stage)
    );
  }

  #checkNormalCollisionToUp(stage) {
    return this.#detectCollision(stage, new Point(this.x, this.y - this.speed));
  }

  #checkIntermediateCollisionToUp(stage) {
    return this.#detectCollision(
      stage,
      new Point(Math.ceil(this.x), this.y - this.speed),
    );
  }

  #detectCollision(stage, point) {
    const newX = Number.parseInt(point.x);
    const newY = Number.parseInt(point.y);
    return stage.logicalStage[newY][newX] == 0;
  }

  #moveRight() {
    this.x += this.speed;
    this.color = this.#COLORS.RIGHT;
  }

  #moveLeft() {
    this.x -= this.speed;
    this.color = this.#COLORS.LEFT;
  }

  #moveDown() {
    this.y += this.speed;
    this.color = this.#COLORS.DOWN;
  }

  #moveUp() {
    this.y -= this.speed;
    this.color = this.#COLORS.UP;
  }

  #plantABomb(input, stage) {
    if (input.keys["KeyA"]) {
      const newX = Math.floor(this.x);
      const newY = Math.floor(this.y);
      console.log(stage.getAmountBombs());
      if (
        stage.logicalStage[newY][newX] == 1 &&
        stage.getAmountBombs() < this.bombsAllowed
      ) {
        stage.addBomb(new Bomb(this.ctx, newX, newY));
        stage.logicalStage[newY][newX] = 2;
      }
    }
  }
}
