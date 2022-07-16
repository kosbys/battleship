import Player from './player';
import shipGrid from './domHandlers';

export default class GameLoop {
  players: Player[];

  constructor() {
    this.players = [];
  }

  createPlayer(name: string) {
    const player = new Player(name, true);
    shipGrid('player');
    player.placeFleet();
    this.players.push(player);
  }

  createPlayerAI() {
    const player = new Player('AI_PLAYER');
    shipGrid('enemy');
    player.placeFleet();
    this.players.push(player);
  }
}
// Should create one player and one AI player, prompt human for ship placements, set up a turn system
// DOM event listeners by ID coords, make html/css first
// create html base
