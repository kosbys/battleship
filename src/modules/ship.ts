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

  createCoordinatesVertical(start: Point): boolean {
    if (start.y + this.length > 9) {
      return false;
    }
    const shipLengthRange = [...Array(this.length).keys()];

    shipLengthRange.forEach((point) =>
      this.coordinates.push({ x: start.x, y: start.y + point })
    );

    return true;
  }

  createCoordinatesHorizontal(start: Point): boolean {
    if (start.x + this.length > 9) {
      return false;
    }
    const shipLengthRange = [...Array(this.length).keys()];

    shipLengthRange.forEach((point) =>
      this.coordinates.push({ x: start.x + point, y: start.y })
    );

    return true;
  }

  setCoordinates(start: Point): boolean {
    if (this.isVertical) {
      return this.createCoordinatesVertical(start);
    }

    return this.createCoordinatesHorizontal(start);
  }

  isSunk() {
    return this.hits === this.length;
  }
}
