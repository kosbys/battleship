import { test, expect } from 'vitest';
import Player from '../player';
import Ship from '../ship';

test('Random fleet placement', () => {
  const player = new Player('player');
  player.placeFleet();
  expect(player.board.ships.length).toBe(5);
});

test('Changes turns', () => {
  const player = new Player('player', true);
  const enemy = new Player('enemy');
  player.attack({ x: 0, y: 0 }, enemy);
  expect(enemy.isTurn).toBe(true);
});

test('Rejects attacking same coordinates twice', () => {
  const player = new Player('player', true);
  const enemy = new Player('enemy');
  player.attack({ x: 0, y: 0 }, enemy);
  player.setTurn(true);
  expect(player.attack({ x: 0, y: 0 }, enemy)).toBe(false);
});

test('Reports loss', () => {
  const player = new Player('player', true);
  const enemy = new Player('enemy');
  enemy.placeShip(new Ship(2), { x: 0, y: 0 });
  player.attack({ x: 0, y: 0 }, enemy);
  player.setTurn(true);
  player.attack({ x: 1, y: 0 }, enemy);
  expect(enemy.checkLoss()).toBe(true);
});
