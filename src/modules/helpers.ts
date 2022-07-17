type Point = {
  x: number;
  y: number;
};

function secretPoi() {
  let input = '';
  const poiString = 'poi';
  const poi = new Audio('./src/audio/poi.ogg');
  document.addEventListener('keydown', (e) => {
    input += e.key;
    if (input === poiString) {
      poi.play();
    }
    if (!poiString.indexOf(input)) {
      return;
    }
    input = `${e.key}`;
  });
}

function randomInteger(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function choiceIndex(choices: any[]): number {
  return Math.floor(Math.random() * choices.length);
}

function choice(choices: any[]) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function trueOrFalse(): boolean {
  return Math.random() < 0.5;
}

function randomCoordsShip(size: number, isVertical: boolean): Point {
  if (isVertical) {
    return {
      x: randomInteger(9, 0),
      y: randomInteger(9 - size, 0),
    };
  }

  return {
    x: randomInteger(9 - size, 0),
    y: randomInteger(9, 0),
  };
}

function equalPoints(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export { equalPoints, trueOrFalse, randomCoordsShip, choiceIndex, choice, secretPoi };
export type { Point };
