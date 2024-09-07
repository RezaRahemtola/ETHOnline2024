import { State } from "@stackr/sdk/machine";
import { AddressLike, BytesLike, keccak256, toUtf8Bytes } from "ethers";

export type Game = {
  gameId: number;
  gameCreator: AddressLike;
  players: AddressLike[];
  bombPosition: number;
  guessedTiles: number[];
};

export const genesisState: Game = {
  gameId: 0,
  gameCreator: "",
  players: [],
  bombPosition: 0,
  guessedTiles: [],
};

export class GameState extends State<Game> {
  constructor(state: Game) {
    super(state);
  }

  // Here since the state is simple and doesn't need wrapping, we skip the transformers to wrap and unwrap the state

  // transformer() {
  //   return {
  //     wrap: () => this.state,
  //     unwrap: (wrappedState: number) => wrappedState,
  //   };
  // }

  getRootHash(): BytesLike {
    return keccak256(toUtf8Bytes(JSON.stringify(this.state)));
  }
}
