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
    //TODO: Refactor this method to reduce cognitive complexity
    if (input.keys["ArrowRight"]) {
      let collision = false;
      if (
        this.#detectCollision(stage, {
          x: this.x + this.speed + (1 - this.speed),
          y: this.y,
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (
        this.#detectCollision(stage, {
          x: this.x + this.speed + (1 - this.speed),
          y: Math.ceil(this.y),
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (!collision) {
        this.#moveRight(input, stage);
      }
    }

    if (input.keys["ArrowLeft"]) {
      let collision = false;
      if (this.#detectCollision(stage, { x: this.x - this.speed, y: this.y })) {
        console.log("collision");
        collision = true;
      }

      if (
        this.#detectCollision(stage, {
          x: Math.floor(this.x - this.speed),
          y: Math.ceil(this.y),
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (!collision) {
        this.#moveLeft(input, stage);
      }
    }

    if (input.keys["ArrowDown"]) {
      let collision = false;
      if (
        this.#detectCollision(stage, {
          x: this.x,
          y: this.y + this.speed + (1 - this.speed),
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (
        this.#detectCollision(stage, {
          x: Math.ceil(this.x),
          y: this.y + this.speed + (1 - this.speed),
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (!collision) {
        this.#moveDown(input, stage);
      }
    }

    if (input.keys["ArrowUp"]) {
      let collision = false;
      if (this.#detectCollision(stage, { x: this.x, y: this.y - this.speed })) {
        console.log("collision");
        collision = true;
      }

      if (
        this.#detectCollision(stage, {
          x: Math.ceil(this.x),
          y: this.y - this.speed,
        })
      ) {
        console.log("collision");
        collision = true;
      }

      if (!collision) {
        this.#moveUp(input, stage);
      }
    }
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
