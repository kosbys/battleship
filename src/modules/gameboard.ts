import Ship from "./ship";
import { equalPoints, Point } from "./helpers";

export default class Gameboard {
  readonly GRID_SIZE: number = 10;

  readonly EMPTY_CELL = 0;

  readonly SHIP_CELL = 1;

  readonly HIT_CELL = 2;

  grid: number[][]; // (Y, X)

  ships: Ship[];

  sunk: number;

  constructor() {
    // 10x10 grid of zeroes
    this.grid = Array(this.GRID_SIZE)
      .fill(0)
      .map(() => Array(this.GRID_SIZE).fill(this.EMPTY_CELL));

    this.sunk = 0;

    this.ships = [];
  }

  addShipToGrid(ship: Ship) {
    ship.coordinates.forEach((point) => {
      this.grid[point.y][point.x] = this.SHIP_CELL;
    });
  }

  addShip(ship: Ship, coordinates: Point) {
    ship.setCoordinates(coordinates);

    // Deep search to see if new ship coordinates overlaps with existing ships
    const duplicate = this.ships.some((vessel) =>
      vessel.coordinates.some((a) =>
        ship.coordinates.some((b) => equalPoints(a, b))
      )
    );

    if (duplicate) {
      return;
    }

    this.ships.push(ship);
    this.addShipToGrid(ship);
  }

  receiveAttack(coordinates: Point) {
    this.grid[coordinates.y][coordinates.x] = this.HIT_CELL;

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
}
