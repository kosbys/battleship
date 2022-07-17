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

  enemyAttack() {
    const randomAttack = this.players.computer.attackRandom(this.players.human);
    const allyGrid = document.getElementById('player-ships');
    const cell = allyGrid?.querySelector(
      `[id='${randomAttack.y}${randomAttack.x}']`
    ) as HTMLDivElement;
    GameLoop.paintCell(cell, randomAttack, this.players.human);
  }

  createEnemyTargets() {
    const enemyGrid = document.getElementById('enemy-ships');
    enemyGrid?.childNodes.forEach((cell) => {
      cell.addEventListener('click', (e: Event) => {
        const coords = e?.currentTarget as HTMLDivElement;
        const coordsPoint: Point = { y: +coords.id[0], x: +coords.id[1] };
        GameLoop.paintCell(coords, coordsPoint, this.players.computer);
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

  static paintCell(coords: HTMLDivElement, point: Point, player: Player) {
    if (player.board.grid[point.y][point.x] === Gameboard.EMPTY_CELL) {
      coords.style.backgroundColor = '#99d98c';
    }
    if (player.board.grid[point.y][point.x] === Gameboard.SHIP_CELL) {
      coords.style.backgroundColor = '#d90429';
    }
  }
}
// Should create one player and one AI player, prompt human for ship placements, set up a turn system
// DOM event listeners by ID coords, make html/css first
// create html base
// domhandlers should import from gameloop??
