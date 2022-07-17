import Gameboard from './gameboard';
import { Point, randomCoords, trueOrFalse, equalPoints, choiceIndex } from './helpers';
import Ship from './ship';

export default class Player {
  name: string;

  board: Gameboard;

  isTurn: boolean;

  coordsHit: Point[];

  coordsRemaining: Point[];

  constructor(name: string, isTurn: boolean = false) {
    this.name = name;
    this.board = new Gameboard();
    this.isTurn = isTurn;
    this.coordsHit = [];
    this.coordsRemaining = this.fullCoordinates();
  }

  setTurn(turn: boolean) {
    this.isTurn = turn;
  }

  fullCoordinates(): Point[] {
    const coords = this.board.grid.map((row, i) =>
      row.map((_, j) => {
        const point = { x: j, y: i };
        return point;
      })
    );

    return coords.flat();
  }

  changeTurn(player: Player) {
    this.setTurn(false);
    player.setTurn(true);
  }

  checkLoss(): boolean {
    return this.board.allSunk();
  }

  checkDuplicateHit(coordinates: Point): boolean {
    return this.coordsHit.some((point) => equalPoints(point, coordinates));
  }

  attack(coordinates: Point, player: Player): boolean {
    if (this.isTurn && !player.checkDuplicateHit(coordinates)) {
      player.board.receiveAttack(coordinates);
      player.coordsHit.push(coordinates);
      player.checkLoss();
      this.changeTurn(player);
      return true;
    }

    return false;
  }

  placeShip(ship: Ship, coordinates: Point): boolean {
    return this.board.addShip(ship, coordinates);
  }

  attackRandom(player: Player) {
    const [randomPoint] = player.coordsRemaining.splice(choiceIndex(player.coordsRemaining), 1);
    this.attack(randomPoint, player);
  }

  // Should be random
  placeFleet() {
    const shipSizes = [5, 4, 3, 3, 2];
    shipSizes.forEach((size) => {
      while (true) {
        if (this.board.addShip(new Ship(size, trueOrFalse()), randomCoords())) {
          break;
        }
      }
    });
  }
}
