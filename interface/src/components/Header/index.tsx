import { ChainId } from 'alphaswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/images/mainlogo.png'
import { useActiveWeb3React } from '../../hooks'
//import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import { ExternalLink } from '../../theme'
import { Terminal, Send, BarChart } from "react-feather";
import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
// import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;
  text-decoration-style: unset;
  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`
const NavbarItem = styled.div`
    flex: 1;
    align-items: left;
    display: flex;
    justify-content: space-evenly;
  `

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`


const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.STANDALONE]: 'KCC Mainnet',
  [ChainId.MOONROCK]: 'KCC Mainnet',
  [ChainId.MOONBASE]: 'KCC Mainnet',
  [ChainId.MOONSHADOW]: 'KCC Mainnet',
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  //const [isDark] = useDarkModeManager()

  if ( isMobile ) {
    return (
      <HeaderFrame>
        <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
          <HeaderElement>
            <Title href=".">
              <UniIcon>
                <img style={{ height: 70 }} src={Logo} alt="logo" />
              </UniIcon>
            </Title>
            </HeaderElement>
            <NavbarItem>
            <ExternalLink style={{color: 'white'}} href={`https://github.com/alphadao-money`}>
              {('')}
              <Terminal size={20} />
            </ExternalLink>
            <ExternalLink style={{color: 'white'}} href={`https://t.me/alphadao1337`}>
              {('')}
              <Send size={20} />
            </ExternalLink>
            <ExternalLink style={{color: 'white'}} href={`https://info.alphadao.money`}>
              {('')}
              <BarChart size={20} />
            </ExternalLink>
          </NavbarItem>
          <HeaderControls>
            <HeaderElement>
              <TestnetWrapper>
                {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
              </TestnetWrapper>
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                    {userEthBalance?.toSignificant(4)} KCS
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            <HeaderElementWrap>
              {/* <VersionSwitch /> */}
            </HeaderElementWrap>
          </HeaderControls>
        </RowBetween>
      </HeaderFrame>
    )
  } else {
    return (
      <HeaderFrame>
        <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
          <HeaderElement>
            <Title href=".">
              <UniIcon>
                <img style={{ height: 70 }} src={Logo} alt="logo" />
              </UniIcon>
            </Title>
            </HeaderElement>
            <NavbarItem>
            <ExternalLink style={{color: 'white'}} href={`https://github.com/alphadao-money`}>
              {('Github')}
              <Terminal size={20} />
            </ExternalLink>
            <ExternalLink style={{color: 'white'}} href={`https://t.me/alphadao1337`}>
              {('Telegram')}
              <Send size={20} />
            </ExternalLink>
            <ExternalLink style={{color: 'white'}} href={`https://info.alphadao.money`}>
              {('Charts')}
              <BarChart size={20} />
            </ExternalLink>
          </NavbarItem>
          <HeaderControls>
            <HeaderElement>
              <TestnetWrapper>
                {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
              </TestnetWrapper>
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                    {userEthBalance?.toSignificant(4)} KCS
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            <HeaderElementWrap>
              {/* <VersionSwitch /> */}
            </HeaderElementWrap>
          </HeaderControls>
        </RowBetween>
      </HeaderFrame>
    )
  }
 }

