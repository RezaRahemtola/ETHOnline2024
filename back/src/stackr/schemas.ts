import { ActionSchema, SolidityType } from "@stackr/sdk";

export const CreateGameSchema = new ActionSchema("createGame", {
  bombPosition: SolidityType.UINT,
});

export const GuessTileSchema = new ActionSchema("guessTile", {
  tilePosition: SolidityType.UINT,
});

export const schemas = {
  createGame: CreateGameSchema,
  guessTile: GuessTileSchema,
};
