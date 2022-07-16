import './index.css';
import GameLoop from './modules/gameLoop';

const battleship = new GameLoop();

battleship.createPlayer('me');
battleship.createPlayerAI();
