import { IsString } from "class-validator";
import { Game } from "../stackr/state";

export class ReducerBody {
  @IsString()
  msgSender: string;

  @IsString()
  signature: string;

  inputs: unknown;
}

export type CurrentGameState = Omit<Game, "bombPosition">;
