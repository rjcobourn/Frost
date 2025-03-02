import React, { useState } from 'react'
import { AutoColumn } from "../../components/Column"
import { SwapPoolTabs } from "../../components/NavigationTabs"
import AppBody from "../AppBody"
import { useActiveWeb3React } from '../../hooks'
import { ContractFactory } from "ethers"

import token_abi from "../../constants/abis/launch-token.json"
import { bytecode } from "../../launch-token/token-bytecode.json"

export default function Launch() {
  const [name, set_name] = useState("")
  const [symbol, set_symbol] = useState("")
  const [decimals, set_decimals] = useState("")
  const [supply, set_supply] = useState("")
  
  const { library } = useActiveWeb3React()

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'launch'} />
        <AutoColumn gap="sm" justify="center">
          <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr"
          }}>
            <p>Name</p>
            <input value={name} onInput={e => set_name(e.currentTarget.value)} />
            <p>Symbol</p>
            <input value={symbol} onInput={e => set_symbol(e.currentTarget.value)} />
            <p>Decimals</p>
            <input value={decimals} onInput={e => set_decimals(e.currentTarget.value)} />
            <p>Supply</p>
            <input value={supply} onInput={e => set_supply(e.currentTarget.value)} />
          </div>
          <button onClick={async () => {
            if (library) {
              const signer = library.getSigner()
              const factory = new ContractFactory(token_abi, bytecode, signer)
              const deployed = await factory.deploy(name, symbol, parseInt(decimals), parseInt(supply))
              console.log(deployed.address)
            }
          }}>
            Launch
          </button>
        </AutoColumn>
      </AppBody>
    </>
  )
}