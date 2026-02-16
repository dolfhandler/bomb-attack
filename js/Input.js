
export class Input {
  constructor() {
    this.keys = {};

    globalThis.addEventListener("keydown", (e) => {
      // console.log(e.code);
      this.keys[e.code] = true;
    });

    globalThis.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }
}
