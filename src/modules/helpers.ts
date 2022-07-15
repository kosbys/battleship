type Point = {
  x: number;
  y: number;
};

function randomInteger(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function trueOrFalse(): boolean {
  return Math.random() < 0.5;
}

function randomCoords(): Point {
  return {
    x: randomInteger(9, 0),
    y: randomInteger(9, 0),
  };
}

function equalPoints(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export { equalPoints, trueOrFalse, randomCoords };
export type { Point };
