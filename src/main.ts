import './index.css';
import GameLoop from './modules/gameLoop';
import { secretPoi } from './modules/helpers';

secretPoi();

const battleship = new GameLoop();

battleship.beginGame();

// TODO: Add documentation
