import { ActionConfirmationStatus } from "@stackr/sdk";
import { Wallet } from "ethers";
import { mru } from "./stackr/mru.ts";
import { RevealSchema } from "./stackr/schemas.ts";
import { signMessage } from "./utils.ts";

const main = async () => {
  const inputs = {
    x: 0,
    y: 0,
  };

  // Create a random wallet
  const wallet = Wallet.createRandom();

  const signature = await signMessage(wallet, RevealSchema, inputs);
  const revealAction = RevealSchema.actionFrom({
    inputs,
    signature,
    msgSender: wallet.address,
  });

  const ack = await mru.submitAction("reveal", revealAction);
  console.log(ack.hash);

  // leverage the ack to wait for C1 and access logs & error from STF execution
  const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
  console.log({ logs, errors });
};

main();
