import React, { useMemo } from 'react'
import styled from 'styled-components'
import { usePairData } from '../../contexts/PairData'
import { TYPE } from '../../Theme'
import { formattedNum } from '../../utils'
import { AutoColumn } from '../Column'
import Panel from '../Panel'
import { RowFixed } from '../Row'

const PriceCard = styled(Panel)`
  position: absolute;
  right: -220px;
  width: 220px;
  top: -20px;
  z-index: 9999;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg1};
`

function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return '<1%'
  } else return parseFloat(rawPercent * 100).toFixed(0) + '%'
}

// get okt price
export default function UniPrice() {
  // kkt-usdk
  // const usdkPair = usePairData('0x6dc3c4ba83f11747482a9d12b9127488eb498c24')
  // kkt-usdc
  // const usdcPair = usePairData('0x812d2bad14e1a92e71bb5ea44c5ac1861feee132')

  // kkt-usdt
  // const usdtPair = usePairData('0x7716f8b9d0112de69467923829197ed0e231cfb7')

  // // wokt-usdk
  // const usdkPair = usePairData('0xc3a9967c7ab0a4312e225feef19103168995643d')

  // // wokt-usdc
  // const usdcPair = usePairData('0x4a8123ac977380198241e9edc64a986e483ba75d')

  // wokt-usdt
  const usdtPair = usePairData('0xbca246ce4d0e77c003906aec334195d3c65eedb4')

  const totalLiquidity = useMemo(() => {
    return usdtPair ? usdtPair.trackedReserveUSD : 0
  }, [usdtPair])

  console.log('UniPrice', usdtPair)

  // const daiPerEth = usdkPair ? parseFloat(usdkPair.token0Price).toFixed(2) : '-'
  // const usdcPerEth = usdcPair ? parseFloat(usdcPair.token0Price).toFixed(2) : '-'
  const usdtPerEth = usdtPair ? parseFloat(usdtPair.token1Price).toFixed(2) : '-'

  return (
    <PriceCard>
      <AutoColumn gap="10px">
        {/* <RowFixed>
          <TYPE.main>USDK/OKT: {formattedNum(daiPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdkPair && totalLiquidity ? formatPercent(usdkPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
        <RowFixed>
          <TYPE.main>USDC/OKT: {formattedNum(usdcPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdcPair && totalLiquidity ? formatPercent(usdcPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed> */}
        <RowFixed>
          <TYPE.main>USDT/OKT: {formattedNum(usdtPerEth, true)}</TYPE.main>
          <TYPE.light style={{ marginLeft: '10px' }}>
            {usdtPair && totalLiquidity ? formatPercent(usdtPair.trackedReserveUSD / totalLiquidity) : '-'}
          </TYPE.light>
        </RowFixed>
      </AutoColumn>
    </PriceCard>
  )
}
