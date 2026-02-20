import { Bomb } from "./Bomb.js";
import { Point } from "./Point.js";
import { Constants } from "../Utilities/Constants.js";

export class Player {
  #COLORS = {
    RIGHT: "#75fa70",
    DOWN: "#75fa70",
    LEFT: "#75fa70",
    UP: "#75fa70",
  };

  #count;
  #delay;

  constructor(ctx, x, y, camera) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.camera = camera;

    this.color = this.#COLORS.DOWN;
    this.width = 40;
    this.height = 40;
    this.speed = 1 / 8;
    this.bombsAllowed = 3;
    this.#count = 6;
    this.#delay = 6;
  }

  update(input, stage) {
    this.#move(input, stage);
    this.#plantABomb(input, stage);
    this.#sendLocationToStage(stage);
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
      this.x * Constants.TILE_SIZE + 5,
      this.y * Constants.TILE_SIZE + 20,
    );
    this.ctx.fillText(
      `y: ${this.y}`,
      this.x * Constants.TILE_SIZE + 5,
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
    return stage.logicalStage[newY][newX] != 1;
  }

  #moveRight() {
    this.x += this.speed;
    this.color = this.#COLORS.RIGHT;

    this.camera.moveRight(this.speed);
  }

  #moveLeft() {
    this.x -= this.speed;
    this.color = this.#COLORS.LEFT;

    this.camera.moveLeft(this.speed);
  }

  #moveDown() {
    this.y += this.speed;
    this.color = this.#COLORS.DOWN;

    this.camera.moveDown(this.speed);
  }

  #moveUp() {
    this.y -= this.speed;
    this.color = this.#COLORS.UP;
    
    this.camera.moveUp(this.speed);
  }

  #plantABomb(input, stage) {
    if (this.#count < this.#delay) {
      this.#count++;
      return;
    }
    this.#count = 0;

    if (input.keys["KeyA"]) {
      let newX = Math.round(this.x);
      let newY = Math.round(this.y);

      if (input.keys["ArrowRight"]) {
        newX = Math.floor(this.x);
      }

      if (input.keys["ArrowLeft"]) {
        newX = Math.ceil(this.x);
      }

      if (input.keys["ArrowUp"]) {
        newY = Math.ceil(this.y);
      }

      if (input.keys["ArrowDown"]) {
        newY = Math.floor(this.y);
      }

      const newPoint = new Point(newX, newY);
      if (this.#isPossiblePlantABomb(stage, newPoint)) {
        stage.addBomb(new Bomb(this.ctx, newPoint));
        stage.logicalStage[newY][newX] = 2;
      }
    }
  }

  #isPossiblePlantABomb(stage, point) {
    return (
      stage.logicalStage[point.y][point.x] == 1 &&
      stage.getAmountBombs() < this.bombsAllowed
    );
  }

  #sendLocationToStage(stage) {
    stage.setPlayerLocation(Point.fromEntity(this));
  }
}
