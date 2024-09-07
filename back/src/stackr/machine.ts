import { StateMachine } from "@stackr/sdk/machine";

import { GameState, genesisState } from "./state";
import { transitions } from "./transitions";

const machine = new StateMachine({
  id: "game",
  stateClass: GameState,
  initialState: genesisState,
  on: transitions,
});

export default machine;
