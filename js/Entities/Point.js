export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromEntity(entity) {
    return new Point(entity.x, entity.y);
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}
