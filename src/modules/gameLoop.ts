import Player from './player';
import { Point } from './helpers';
import Gameboard from './gameboard';

type Players = {
  human: Player;
  computer: Player;
};

export default class GameLoop {
  players: Players;

  constructor() {
    this.players = {} as Players;
  }

  createPlayer(name: string) {
    const player = new Player(name, true);
    player.placeFleet();
    GameLoop.shipGrid('player');
    this.players.human = player;
  }

  paintCell(coords: HTMLDivElement, point: Point) {
    if (this.players.computer.board.grid[point.y][point.x] === Gameboard.EMPTY_CELL) {
      coords.style.backgroundColor = '#99d98c';
    }
    if (this.players.computer.board.grid[point.y][point.x] === Gameboard.SHIP_CELL) {
      coords.style.backgroundColor = '#d90429';
    }
  }

  createEnemyTargets() {
    const enemyGrid = document.getElementById('enemy-ships');
    enemyGrid?.childNodes.forEach((cell) => {
      cell.addEventListener('click', (e: Event) => {
        const coords = e?.currentTarget as HTMLDivElement;
        const coordsPoint: Point = { y: +coords.id[0], x: +coords.id[1] };
        this.paintCell(coords, coordsPoint);
        this.players.human.attack(coordsPoint, this.players.computer);
      });
    });
  }

  createPlayerAI() {
    const player = new Player('enemy');
    player.placeFleet();
    GameLoop.shipGrid('enemy');
    this.createEnemyTargets();
    this.players.computer = player;
  }

  static shipGrid(player: string) {
    const grid = document.getElementById(`${player}-ships`);
    [...Array(10).keys()].forEach((i) => {
      [...Array(10).keys()].forEach((j) => {
        const cell = document.createElement('div');
        cell.id = `${i}${j}`;
        cell.className =
          'cell w-8 bg-white outline outline-2 dark:outline-white outline-black dark:bg-black aspect-square md:w-10 lg:w-12 xl:w-14 2xl:w-18';
        if (player === 'enemy') {
          cell.classList.add('hover:bg-gray-900');
          cell.classList.add('dark:hover:bg-slate-100');
        }
        grid?.append(cell);
      });
    });
  }
}
// Should create one player and one AI player, prompt human for ship placements, set up a turn system
// DOM event listeners by ID coords, make html/css first
// create html base
// domhandlers should import from gameloop??
