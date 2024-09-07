import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../../stackr.config";
import machine from "./machine";
import { CreateGameSchema, GuessTileSchema } from "./schemas";
import { lazyLoad } from "../util/utils";

const getMru = lazyLoad(async () => {
  const rollup = await MicroRollup({
    config: stackrConfig,
    actionSchemas: [CreateGameSchema, GuessTileSchema],
    stateMachines: [machine],
  });

  await rollup.init();
  return rollup;
});

export default getMru;
