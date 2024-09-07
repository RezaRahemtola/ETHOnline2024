import { BadRequestException, Injectable } from "@nestjs/common";
import { transitions } from "../stackr/transitions";
import { CurrentGameState, ReducerBody } from "./app.dto";
import { schemas } from "../stackr/schemas";
import { ActionEvents, ActionExecutionStatus } from "@stackr/sdk";
import getMru from "../stackr/mru";
import { Game } from "../stackr/state";
import _ from "lodash";

@Injectable()
export class AppService {
  async getGame(): Promise<CurrentGameState> {
    const mru = await getMru();
    const state = (await mru.stateMachines.getFirst()?.state) as Game;

    return _.omit(state, "bombPosition");
  }

  async reducer(
    reducer: string,
    { msgSender, signature, inputs }: ReducerBody,
  ) {
    const actionReducer = transitions[reducer];

    if (!actionReducer) {
      throw new BadRequestException("No reducer for action");
    }

    const schema = schemas[reducer];

    try {
      const newAction = schema.actionFrom({ inputs, msgSender, signature });
      const mru = await getMru();
      const ack = await mru.submitAction(reducer, newAction);
      const actionHash = ack.actionHash;

      await new Promise(() => {
        mru.events.subscribe(ActionEvents.EXECUTION_STATUS, (action) => {
          if (action.actionHash === actionHash) {
            if (action.status === ActionExecutionStatus.ACCEPTED) {
              return {
                message: "Action executed successfully",
                details: { actionHash, status: action.status },
              };
            } else if (action.status === ActionExecutionStatus.REVERTED) {
              throw new BadRequestException({
                error: "Action failed to execute",
                details: { actionHash, status: action.status },
              });
            }
          }
        });
      });
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }
}
