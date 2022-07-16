import { test, expect } from 'vitest';
import Gameboard from '../gameboard';
import Ship from '../ship';

test('Places down valid ships correctly', () => {
  const board = new Gameboard();
  board.addShip(new Ship(4), { x: 0, y: 0 });
  board.addShip(new Ship(2), { x: 4, y: 4 });

  expect(board.ships.length).toEqual(2);
});

test('Rejects invalid ship configuration', () => {
  const board = new Gameboard();
  board.addShip(new Ship(4), { x: 0, y: 0 });
  board.addShip(new Ship(2), { x: 0, y: 0 });

  expect(board.ships.length).toEqual(1);
});

test('Rejects invalid ship configuration when too close', () => {
  const board = new Gameboard();
  board.addShip(new Ship(4), { x: 0, y: 0 });
  board.addShip(new Ship(2), { x: 1, y: 1 });

  expect(board.ships.length).toEqual(1);
});

test('Receives attack at correct coords', () => {
  const board = new Gameboard();
  board.receiveAttack({ x: 0, y: 0 });

  expect(board.grid[0][0]).toEqual(Gameboard.HIT_CELL);
});

test('Places down ships in the grid', () => {
  const board = new Gameboard();
  board.addShip(new Ship(2), { x: 0, y: 0 });

  expect(board.grid[0][0]).toEqual(Gameboard.SHIP_CELL);
  expect(board.grid[0][1]).toEqual(Gameboard.SHIP_CELL);
});

test('Reports all ships as sunk correctly', () => {
  const board = new Gameboard();
  board.addShip(new Ship(2), { x: 0, y: 0 });
  board.addShip(new Ship(2), { x: 0, y: 1 });
  board.receiveAttack({ x: 0, y: 0 });
  board.receiveAttack({ x: 1, y: 0 });
  board.receiveAttack({ x: 0, y: 1 });
  board.receiveAttack({ x: 1, y: 1 });

  expect(board.allSunk()).toEqual(true);
});
