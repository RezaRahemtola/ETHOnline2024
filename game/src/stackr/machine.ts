import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { GameState } from "./state";
import { transitions } from "./transitions";

const machine = new StateMachine({
  id: "bomb game",
  stateClass: GameState,
  initialState: genesisState.state,
  on: transitions,
});

export { machine };
