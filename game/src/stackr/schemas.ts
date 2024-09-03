import { ActionSchema, SolidityType } from "@stackr/sdk";

export const RevealSchema = new ActionSchema("reveal", {
  x: SolidityType.UINT,
  y: SolidityType.UINT,
});
