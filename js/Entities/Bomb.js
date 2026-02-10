import { Constants } from "../Utilities/Constants.js";
import { Flame } from "./Flame.js";

export class Bomb {
  #flames;
  #count;
  #delay;
  #flameCounter;
  #flameDuration;

  constructor(ctx, x, y) {
    const { TILE_SIZE } = Constants;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.range = 5;

    this.#count = 0;
    this.#delay = 180;

    this.#flameCounter = 0;
    this.#flameDuration = 30;

    this.#flames = new Array();
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      this.x * Constants.TILE_SIZE,
      this.y * Constants.TILE_SIZE,
      this.width,
      this.height,
    );

    this.#flames.forEach((flame) => flame.draw());
  }

  explode(stage) {
    if (this.#count < this.#delay) {
      this.#count++;
      return;
    }

    this.#count = 0;

    const { CENTER } = Constants.POSITION;
    this.#flames.push(new Flame(this.ctx, this.x, this.y, CENTER));
    this.#addFlameToLeft(stage);
    this.#addFlamesToUP(stage);
    this.#addFlamesToRight(stage);
    this.#addFlamesToDown(stage);

    stage[this.y][this.x] = 1;
  }

  #addFlamesToRight(stage) {
    const { RIGHT } = Constants.POSITION;
    for (let i = 0; i < this.range; i++) {
      if (stage[this.y][this.x + i + 1] == 0) break;

      this.#flames.push(new Flame(this.ctx, this.x + i + 1, this.y, RIGHT));
    }
  }

  #addFlameToLeft(stage) {
    const { LEFT } = Constants.POSITION;
    for (let i = 0; i < this.range; i++) {
      if (stage[this.y][this.x - i - 1] == 0) break;

      this.#flames.push(new Flame(this.ctx, this.x - i - 1, this.y, LEFT));
    }
  }

  #addFlamesToDown(stage) {
    const { DOWN } = Constants.POSITION;
    for (let i = 0; i < this.range; i++) {
      if (stage[this.y + i + 1][this.x] == 0) break;

      this.#flames.push(new Flame(this.ctx, this.x, this.y + i + 1, DOWN));
    }
  }

  #addFlamesToUP(stage) {
    const { UP } = Constants.POSITION;
    for (let i = 0; i < this.range; i++) {
      if (stage[this.y - i - 1][this.x] == 0) break;

      this.#flames.push(new Flame(this.ctx, this.x, this.y - i - 1, UP));
    }
  }

  flameOut() {
    if (this.#flames.length == 0) return;

    if (this.#flameCounter < this.#flameDuration) {
      this.#flameCounter++;
      return false;
    }

    this.#flameCounter = 0;
    this.#flames = new Array();
    return true;
  }
}
