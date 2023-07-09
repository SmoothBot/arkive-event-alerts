import { BlockHandler } from "https://deno.land/x/robo_arkiver/mod.ts";


// deno-lint-ignore require-await
export const onblock: BlockHandler = async ({ 
  block, 
  store 
}): Promise<void> => {
  store.set('lastBlock', block.number)
}