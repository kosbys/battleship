import { Point } from "./helpers";

export default class Ship {
  length: number;

  hits: number;

  isVertical: boolean;

  coordinates: Point[];

  constructor(length: number, isVertical: boolean = false) {
    this.length = length;
    this.hits = 0;
    this.isVertical = isVertical;
    this.coordinates = [];
  }

  hit() {
    this.hits += 1;
  }

  setCoordinates(start: Point) {
    if (this.isVertical) {
      const maxCoords = start.y + this.length;

      if (maxCoords > 9) {
        return;
      }

      // Range object from 0 to ship length
      [...Array(this.length).keys()].forEach((i) =>
        this.coordinates.push({ x: start.x, y: start.y + i })
      );
    } else {
      const maxCoords = start.x + this.length;

      if (maxCoords > 9) {
        return;
      }

      [...Array(this.length).keys()].forEach((i) =>
        this.coordinates.push({ x: start.x + i, y: start.y })
      );
    }
  }

  isSunk() {
    return this.hits === this.length;
  }
}
