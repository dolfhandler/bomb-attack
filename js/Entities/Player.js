import { Constants } from "../Utilities/Constants.js";
import { Bomb } from "./Bomb.js";

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
  }

  #move(input, stage) {
    this.#moveRight(input, stage);
    this.#moveLeft(input, stage);
    this.#moveDown(input, stage);
    this.#moveUp(input, stage);
  }

  #moveRight(input, stage) {
    if (input.keys["ArrowRight"]) {
      const newX = Math.ceil(this.x + this.speed);
      const newY = Math.round(this.y);
      console.log(
        "ArrowRight",
        { y: newY, x: newX },
        stage.logicalStage[newY][newX],
      );

      if (stage.logicalStage[newY][newX] == 1) {
        this.x += this.speed;
        this.color = this.#COLORS.RIGHT;
      }
    }
  }

  #moveLeft(input, stage) {
    if (input.keys["ArrowLeft"]) {
      const newX = Math.floor(this.x - this.speed);
      const newY = Math.round(this.y);
      console.log(
        "ArrowLeft",
        { y: newY, x: newX },
        stage.logicalStage[newY][newX],
      );

      if (stage.logicalStage[newY][newX] == 1) {
        this.x -= this.speed;
        this.color = this.#COLORS.LEFT;
      }
    }
  }

  #moveDown(input, stage) {
    if (input.keys["ArrowDown"]) {
      const newX = Math.round(this.x);
      const newY = Math.ceil(this.y + this.speed);
      console.log(
        "ArrowDown",
        { y: newY, x: newX },
        stage.logicalStage[newY][newX],
      );

      if (stage.logicalStage[newY][newX] == 1) {
        this.y += this.speed;
        this.color = this.#COLORS.DOWN;
      }
    }
  }

  #moveUp(input, stage) {
    if (input.keys["ArrowUp"]) {
      const newX = Math.round(this.x);
      const newY = Math.floor(this.y - this.speed);
      console.log(
        "ArrowUp",
        { y: newY, x: newX },
        stage.logicalStage[newY][newX],
      );

      if (stage.logicalStage[newY][newX] == 1) {
        this.y -= this.speed;
        this.color = this.#COLORS.UP;
      }
    }
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
