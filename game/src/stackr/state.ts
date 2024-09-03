import { State } from "@stackr/sdk/machine";
import { solidityPackedKeccak256 } from "ethers";
import { state } from "./types"

export class GameState extends State<state> {
  constructor(state: state) {
    super(state);
  }

  transformer(): { wrap: () => state; unwrap: (wrappedState: state) => state; } {
    return {
      wrap: () => {
        return this.state;
      },
      unwrap: (wrappedState: state) => {
        return wrappedState;
      },
    };
  }

  getRootHash() {
    return solidityPackedKeccak256(["bool", "uint256[][]"], [this.state.bombeRevealed, this.state.board]);
  }
}
