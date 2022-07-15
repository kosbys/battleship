type Point = {
  x: number;
  y: number;
};

function equalPoints(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export { equalPoints };
export type { Point };
