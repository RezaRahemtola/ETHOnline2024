import { REQUIRE, STF, Transitions } from "@stackr/sdk/machine";
import { GameState } from "./state";

const reveal: STF<GameState> = {
  handler: ({ state, inputs, emit }) => {
    var val = state.board[inputs.x][inputs.y];
    if (val === 9) {
      state.bombeRevealed = true;
      emit({ name: "BombeRevealed", value: state });
    } else if (val === 0) {
      state.board[inputs.x][inputs.y] = 1;
      emit({ name: "CaseRevealed", value: state });
    } else {
      REQUIRE(val === 1, "Case already revealed");
    }
    return state;
  },
};

export const transitions: Transitions<GameState> = {
  reveal,
};
