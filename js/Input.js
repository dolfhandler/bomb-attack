
export class Input {
  constructor() {
    this.keys = {};

    window.addEventListener("keydown", (e) => {
      // console.log(e.code);
      this.keys[e.code] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
  }
}
