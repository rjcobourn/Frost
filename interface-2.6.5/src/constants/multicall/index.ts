import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.OORT]: '0x226C9C2CE2f07D25165404FeA20783aA294b4dBc'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
