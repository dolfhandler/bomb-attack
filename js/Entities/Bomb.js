import { Constants } from "../Utilities/Constants.js";
import { Flame } from "./Flame.js";
import { Point } from "./Point.js";

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
    this.range = 1;

    this.#count = 0;
    this.#delay = 180;

    this.#flameCounter = 0;
    this.#flameDuration = 30;

    this.canExplode = false;

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

  explode(stage, playerLocation, bombs) {
    if (this.canExplode) {
      this.#count = this.#delay;
    }

    if (this.#count < this.#delay) {
      this.#count++;
      return;
    }

    this.#count = 0;
    this.#addFlameToCenter();
    this.#addFlamesToLeft(stage, bombs);
    this.#addFlamesToUP(stage, bombs);
    this.#addFlamesToRight(stage, bombs);
    this.#addFlamesToDown(stage, bombs);

    stage[this.y][this.x] = 1;
  }

  #addFlameToCenter() {
    this.#flames.push(new Flame(this.ctx, this.x, this.y));
  }

  #addFlamesToRight(stage, bombs) {
    for (let i = 0; i < this.range; i++) {
      const newX = this.x + i + 1;
      const newY = this.y;

      if (stage[newY][newX] == 0) break;
      if (stage[newY][newX] == 2) {
        this.#activateBombInThisLocation(new Point(newX, newY), bombs);
        break;
      }

      this.#flames.push(new Flame(this.ctx, newX, newY));
      stage[newY][newX] = 1;
    }
  }

  #addFlamesToLeft(stage, bombs) {
    for (let i = 0; i < this.range; i++) {
      const newX = this.x - i - 1;
      const newY = this.y;

      if (stage[newY][newX] == 0) break;
      if (stage[newY][newX] == 2) {
        this.#activateBombInThisLocation(new Point(newX, newY), bombs);
        break;
      }

      this.#flames.push(new Flame(this.ctx, newX, newY));
      stage[newY][newX] = 1;
    }
  }

  #addFlamesToDown(stage, bombs) {
    for (let i = 0; i < this.range; i++) {
      const newX = this.x;
      const newY = this.y + i + 1;

      if (stage[newY][newX] == 0) break;
      if (stage[newY][newX] == 2) {
        this.#activateBombInThisLocation(new Point(newX, newY), bombs);
        break;
      }

      this.#flames.push(new Flame(this.ctx, newX, newY));
      stage[newY][newX] = 1;
    }
  }

  #addFlamesToUP(stage, bombs) {
    for (let i = 0; i < this.range; i++) {
      const newX = this.x;
      const newY = this.y - i - 1;

      if (stage[newY][newX] == 0) break;
      if (stage[newY][newX] == 2) {
        this.#activateBombInThisLocation(new Point(newX, newY), bombs);
        break;
      }

      this.#flames.push(new Flame(this.ctx, newX, newY));
      stage[newY][newX] = 1;
    }
  }

  #activateBombInThisLocation(point, bombs) {
    const bombToActivate = bombs.find((bomb) =>
      point.equals(Point.fromEntity(bomb)),
    );

    if (bombToActivate) {
      bombToActivate.activate();
    }
  }

  flameOut() {
    if (this.#flames.length == 0) {
      return;
    }

    if (this.#flameCounter < this.#flameDuration) {
      this.#flameCounter++;
      return false;
    }

    this.#flameCounter = 0;
    this.#flames = new Array();
    return true;
  }

  activate() {
    this.canExplode = true;
  }
}
