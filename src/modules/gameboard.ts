import Ship from './ship';
import { equalPoints, Point } from './helpers';

export default class Gameboard {
  static readonly GRID_SIZE: number = 10;

  static readonly EMPTY_CELL = 0;

  static readonly SHIP_CELL = 1;

  static readonly HIT_CELL = 2;

  grid: number[][]; // (Y, X)

  ships: Ship[];

  sunk: number;

  constructor() {
    // 10x10 grid of zeroes
    this.grid = Object.seal(
      Array(Gameboard.GRID_SIZE)
        .fill(0)
        .map(() => Array(Gameboard.GRID_SIZE).fill(Gameboard.EMPTY_CELL))
    );

    this.sunk = 0;

    this.ships = [];
  }

  addShipToGrid(ship: Ship) {
    ship.coordinates.forEach((point) => {
      this.grid[point.y][point.x] = Gameboard.SHIP_CELL;
    });
  }

  checkOverlap(coordinates: Point[]): boolean {
    // Deep search to see if new ship coordinates overlaps with any existing ships' coordinates or comes within 1 tile of them
    return this.ships.some((vessel) =>
      vessel.coordinates.some((a) =>
        coordinates.some((b) => a.x - b.x === 1 || a.y - b.y === 1 || equalPoints(a, b))
      )
    );
  }

  addShip(ship: Ship, coordinates: Point): boolean {
    ship.setCoordinates(coordinates);

    const duplicate = this.checkOverlap(ship.coordinates);

    if (duplicate) {
      return false;
    }

    this.ships.push(ship);
    this.addShipToGrid(ship);

    return true;
  }

  receiveAttack(coordinates: Point) {
    this.grid[coordinates.y][coordinates.x] = Gameboard.HIT_CELL;

    // Check if cell is populated by a ship
    const shipHit = this.ships.find((ship) =>
      ship.coordinates.find((point) => equalPoints(coordinates, point))
    );

    if (shipHit) {
      shipHit.hit();

      if (shipHit.isSunk()) {
        this.sunk += 1;
      }
    }
  }

  allSunk(): boolean {
    return this.ships.every((ship) => ship.isSunk());
  }
}
