type Point = {
  x: number;
  y: number;
};

function randomInteger(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function choiceIndex(choices: any[]): number {
  return Math.floor(Math.random() * choices.length);
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

/**
 * Replaced by fullCoordinatesFunctional() from player.ts
 *
 *function fullCoordinates(): Point[] {
 * const x = [];
 * for (let i = 0; i < 10; i += 1) {
 *   for (let j = 0; j < 10; j += 1) {
 *     x.push({ x: j, y: i });
 *   }
 * }
 * return x;
 *}
 */

export { equalPoints, trueOrFalse, randomCoords, choiceIndex };
export type { Point };
