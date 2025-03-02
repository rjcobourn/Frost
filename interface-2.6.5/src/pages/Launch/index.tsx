import React, { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import styled from 'styled-components'
import { darken } from 'polished'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { TYPE } from '../../theme'
import { RowBetween } from '../../components/Row'
import AppBody from '../AppBody'
import { useActiveWeb3React } from '../../hooks'
import { ContractFactory } from 'ethers'
import token_abi from '../../constants/abis/launch-token.json'
import { bytecode } from '../../launch-token/token-bytecode.json'

// Styling components adapted from CurrencyInputPanel
const InputPanel = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
  margin-bottom: 10px;
`

const Container = styled.div`
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`

const InputRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: 0.75rem 0.5rem 0.75rem 1rem;
`

const StyledInput = styled.input`
  color: ${({ theme }) => theme.text1};
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

const StyledButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  border: none;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  height: 2.8rem;
  margin-top: 1rem;
  padding: 0 1rem;
  width: 100%;
  outline: none;

  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }

  :disabled {
    background-color: ${({ theme }) => theme.bg3};
    color: ${({ theme }) => theme.text3};
    cursor: not-allowed;
  }
`

export default function Launch() {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState('')
  const [supply, setSupply] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedAddress, setDeployedAddress] = useState('')

  const { library } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  const handleDeploy = async () => {
    if (library && name && symbol && decimals && supply) {
      try {
        setIsDeploying(true)
        const signer = library.getSigner()
        const factory = new ContractFactory(token_abi, bytecode, signer)
        const deployed = await factory.deploy(name, symbol, parseInt(decimals), parseInt(supply))
        console.log(deployed.address)
        setDeployedAddress(deployed.address)
        setIsDeploying(false)
      } catch (error) {
        console.error('Deployment failed:', error)
        setIsDeploying(false)
      }
    }
  }

  // Form validation
  const isFormValid = name && symbol && decimals && supply && !isNaN(parseInt(decimals)) && !isNaN(parseInt(supply))

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'launch'} />
        <AutoColumn gap="md">
          {/* Token Name Input */}
          <InputPanel>
            <Container>
              <LabelRow>
                <RowBetween>
                  <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                    Token Name
                  </TYPE.body>
                </RowBetween>
              </LabelRow>
              <InputRow>
                <StyledInput
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: Ethereum"
                  autoComplete="off"
                />
              </InputRow>
            </Container>
          </InputPanel>

          {/* Token Symbol Input */}
          <InputPanel>
            <Container>
              <LabelRow>
                <RowBetween>
                  <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                    Token Symbol
                  </TYPE.body>
                </RowBetween>
              </LabelRow>
              <InputRow>
                <StyledInput
                  value={symbol}
                  onChange={e => setSymbol(e.target.value)}
                  placeholder="Ex: ETH"
                  autoComplete="off"
                />
              </InputRow>
            </Container>
          </InputPanel>

          {/* Decimals Input */}
          <InputPanel>
            <Container>
              <LabelRow>
                <RowBetween>
                  <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                    Decimals
                  </TYPE.body>
                </RowBetween>
              </LabelRow>
              <InputRow>
                <StyledInput
                  value={decimals}
                  onChange={e => {
                    const value = e.target.value.replace(/[^\d]/g, '')
                    setDecimals(value)
                  }}
                  placeholder="18"
                  inputMode="numeric"
                  autoComplete="off"
                />
              </InputRow>
            </Container>
          </InputPanel>

          {/* Supply Input */}
          <InputPanel>
            <Container>
              <LabelRow>
                <RowBetween>
                  <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                    Total Supply
                  </TYPE.body>
                </RowBetween>
              </LabelRow>
              <InputRow>
                <StyledInput
                  value={supply}
                  onChange={e => {
                    const value = e.target.value.replace(/[^\d]/g, '')
                    setSupply(value)
                  }}
                  placeholder="1000000"
                  inputMode="numeric"
                  autoComplete="off"
                />
              </InputRow>
            </Container>
          </InputPanel>

          {/* Launch Button */}
          <StyledButton onClick={handleDeploy} disabled={!isFormValid || isDeploying}>
            {isDeploying ? 'Deploying...' : 'Launch Token'}
          </StyledButton>

          {/* Show deployed address if available */}
          {deployedAddress && (
            <TYPE.body textAlign="center" fontSize={14} color={theme.text1} marginTop="1rem">
              Token deployed at: {deployedAddress}
            </TYPE.body>
          )}
        </AutoColumn>
      </AppBody>
    </>
  )
}
