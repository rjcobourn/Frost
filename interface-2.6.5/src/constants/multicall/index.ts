import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MUMBAI]: '0x94F2e214eFB21Bf8C6d85085cFF747A48fe2DFA9'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
