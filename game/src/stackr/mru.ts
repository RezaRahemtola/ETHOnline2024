import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../../stackr.config";
import { machine } from "./machine";
import { RevealSchema } from "./schemas";

const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [RevealSchema],
  stateMachines: [machine],
});

await mru.init();

export { mru };
