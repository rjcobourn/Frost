import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.OORT]: '0xc83186859659308D3C46841CD83D7D8f2d085602'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
