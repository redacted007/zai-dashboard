import React from 'react'
import styled from '@emotion/styled'

import {
  Col,
  Spacer,
  Seperator,
  Flex,
  BigButton,
} from '../../components/Elements'

import Page from '../../components/Page'

import Stats from '../../components/Stats'
import SupplyPanel from './SupplyPanel'
import LiquidityPanel from './LiquidityPanel'

import { mq } from '../../styles'
import Panel from '../Panel'
import { UNI } from '../../constants/tokens'

const TwoCol = styled(Flex)`
  ${mq.mobile} {
    flex-wrap: wrap;
  }
`

const AButton = BigButton.withComponent('a')

const Dashboard = () => {
  return (
    <Page>
      <TwoCol>
        <Panel heading="Buy">
          <TwoCol>
            <Col>
              <AButton
                href={`https://info.uniswap.org/pair/${UNI.addr}`}
                target="_blank"
              >
                Buy ZAIv2
              </AButton>
            </Col>
            <Spacer col size={30} />
            <Col>

            </Col>
          </TwoCol>
        </Panel>
      </TwoCol>

      <Spacer size={30} />

      <TwoCol>
        <Col>
          <SupplyPanel />
        </Col>
        <Spacer col size={30} />
        <Col>
          <LiquidityPanel />
        </Col>
      </TwoCol>

      <Spacer size={80} />
      <Seperator />
      <Spacer size={80} />

      <Stats />

      <Spacer size={160} />
    </Page>
  )
}

export default Dashboard
