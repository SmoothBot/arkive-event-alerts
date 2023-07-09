import { Manifest } from 'https://deno.land/x/robo_arkiver@v0.4.15/mod.ts'
import { onblock } from './handlers/onblock.ts'
import { Erc20Abi } from './abis/erc20.ts'
import { onTransfer } from './handlers/transfer.ts'

const manifest = new Manifest('weth-transfer-alerts')

const mainnet = manifest
  .addChain('mainnet', { blockRange: 500n })

mainnet
  .addContract('ERC20', Erc20Abi)
  .addSources({ '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 17653861n })
  .addEventHandlers({ 'Transfer': onTransfer })

mainnet
  .addBlockHandler({ blockInterval: 1, startBlockHeight: 'live', handler: onblock })

export default manifest.build()
