import { STF, Transitions } from "@stackr/sdk/machine";
import { GameState } from "./state";
import { NUMBER_OF_TILES } from "../util/config";
import { isGameLost, isGameWon } from "./game";

type CreateGameInput = {
  gameCreator: string;
  players: string[];
  bombPosition: number;
};

type GuessTileInput = {
  player: string;
  tilePosition: number;
};

const createGame: STF<GameState, CreateGameInput> = {
  handler: ({ inputs, state }) => {
    if (!isGameWon(state) && !isGameLost(state)) {
      throw new Error("A game is already in progress!");
    }

    const { gameCreator, bombPosition, players } = inputs;

    if (bombPosition < 1 || bombPosition > NUMBER_OF_TILES) {
      throw new Error("Invalid bomb position!");
    }
    state.gameId = state.gameId + 1;
    state.gameCreator = gameCreator;
    state.bombPosition = bombPosition;
    state.players = players;
    return state;
  },
};

const guessTile: STF<GameState, GuessTileInput> = {
  handler: ({ inputs, state }) => {
    if (isGameWon(state) || isGameLost(state)) {
      throw new Error("The game is not in progress. Create a game first!");
    }

    const { player, tilePosition } = inputs;
    if (player === state.gameCreator) {
      throw new Error("The game creator cannot guess the word!");
    }
    if (
      player !== state.players[state.guessedTiles.length % state.players.length]
    ) {
      throw new Error("It's not your turn!");
    }
    if (tilePosition < 1 || tilePosition > NUMBER_OF_TILES) {
      throw new Error("Invalid tile position!");
    }
    if (state.guessedTiles.includes(tilePosition)) {
      throw new Error("Tile already guessed!");
    }

    state.guessedTiles.push(tilePosition);
    return state;
  },
};

export const transitions: Transitions<GameState> = {
  createGame,
  guessTile,
};
