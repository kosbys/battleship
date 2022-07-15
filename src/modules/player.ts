import Gameboard from './gameboard';
import { Point, randomCoords, trueOrFalse, equalPoints } from './helpers';
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
    this.coordsRemaining = this.fullCoordinatesFunctional();
  }

  setTurn(turn: boolean) {
    this.isTurn = turn;
  }

  /**
   * Shuffles the coordinates yet to be hit using the Durstenfeld shuffle to achieve randomness
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   */
  shuffle(): void {
    for (let i = this.coordsRemaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.coordsRemaining[i], this.coordsRemaining[j]] = [
        this.coordsRemaining[j],
        this.coordsRemaining[i],
      ];
    }
  }

  fullCoordinatesFunctional(): Point[] {
    // Maybe too complex compared to fullCoordinates()
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
    player.shuffle();
    this.attack(player.coordsRemaining[player.coordsRemaining.length - 1], player);
    player.coordsRemaining.pop();
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
