import { Game } from "./state";
import { NUMBER_OF_TILES } from "../util/config";

function isGameWon(state: Game): boolean {
  return state.guessedTiles.length === NUMBER_OF_TILES - 1;
}

function isGameLost(state: Game): boolean {
  return state.guessedTiles.includes(state.bombPosition);
}

export { isGameWon, isGameLost };
