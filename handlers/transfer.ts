import { type EventHandlerFor } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'
import { Erc20Abi } from '../abis/erc20.ts'
import { formatUnits } from "npm:viem";

// Alternatively, you can pull this from the chain
const TOKEN_DECIMALS = 18
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1085004868449738833/dQVV1AeoFpYsCVGiI_Ob6v3FW1mQdiQusGPlIqfgcWrjBu3nTh9ydLfxn8Zw-NkgDdwR'

const toNumber = (value: bigint, decimals: number) => {
  return parseFloat(formatUnits(value, decimals))
}

// deno-lint-ignore require-await
export const onTransfer: EventHandlerFor<typeof Erc20Abi, 'Transfer'> = async (
  { event, store },
) => {
  const latestBlock = store.get('lastBlock')
  if (!latestBlock)
    return

  // If it's more than 5 blocks old, it's probably indexing.
  // Note: Live event filters is a feature that will be added soon.
  if (latestBlock - event.blockNumber > 5)
    return

  const { value } = event.args
  const amount = toNumber(value, TOKEN_DECIMALS)

  // If more than 10 ETH, alert discord
  if (amount > 10) {
    const body = {
      content: `${amount.toFixed(2)} ETH transfer detected!`
    };
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }
}

