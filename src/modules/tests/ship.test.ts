import { test, expect } from 'vitest';
import Ship from '../ship';

test('Ship logs hits', () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('Rejects invalid coordinates', () => {
  const ship = new Ship(2);
  ship.setCoordinates({ x: 10, y: 10 });
  expect(ship.setCoordinates({ x: 10, y: 10 })).toBe(false);
});

test('Ship logs correct coordinates', () => {
  const ship = new Ship(2);
  ship.setCoordinates({ x: 0, y: 0 });

  expect(ship.coordinates).toEqual([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
});

test('Ship logs correct vertically', () => {
  const ship = new Ship(2, true);
  ship.setCoordinates({ x: 0, y: 0 });

  expect(ship.coordinates).toEqual([
    { x: 0, y: 0 },
    { x: 0, y: 1 },
  ]);
});

test('Ship sinks when it gets hit enough times', () => {
  const ship = new Ship(4);
  [...Array(ship.length).keys()].forEach(() => {
    ship.hit();
  });
  expect(ship.isSunk()).toBe(true);
});
