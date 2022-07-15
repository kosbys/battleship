import { test, expect } from "vitest";
import Gameboard from "../gameboard";
import Ship from "../ship";

test("Placing down ships", () => {
  const board = new Gameboard();
  board.addShip(new Ship(4), { x: 0, y: 0 });
  board.addShip(new Ship(2), { x: 4, y: 4 });

  expect(board.ships.length).toEqual(2);
});
