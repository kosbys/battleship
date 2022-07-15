import Ship from "./ship";
import { equalPoints, Point } from "./helpers";

export default class Gameboard {
  readonly GRID_SIZE = 10;

  grid: number[][]; // [COL][ROW]

  ships: Ship[];

  constructor() {
    this.grid = Array(this.GRID_SIZE)
      .fill(0)
      .map(() => Array(this.GRID_SIZE).fill(0));

    this.ships = [];
  }

  addShipToGrid(ship: Ship) {
    ship.coordinates.forEach((point) => {
      this.grid[point.y][point.x] = 1;
    });
  }

  addShip(ship: Ship, coordinates: Point) {
    ship.setCoordinates(coordinates);

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
    this.grid[coordinates.y][coordinates.x] = 2;

    const shipHit = this.ships.find((ship) =>
      ship.coordinates.find((point) => equalPoints(coordinates, point))
    );

    if (shipHit) {
      shipHit.hit();
    }
  }
}
