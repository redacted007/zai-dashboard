import React from 'react'
import styled from '@emotion/styled'

import {
  Col,
  Spacer,
  Seperator,
  Flex,
  P,
  LinkButton,
} from '../../components/Elements'

import Page from '../../components/Page'

import Stats from '../../components/Stats'
import SupplyPanel from './SupplyPanel'
import LiquidityPanel from './LiquidityPanel'

import { mq } from '../../styles'
import Panel from '../Panel'

const TwoCol = styled(Flex)`
  ${mq.mobile} {
    flex-wrap: wrap;
  }
`

const Dashboard = () => {
  return (
    <Page>
      <TwoCol>
        <Panel heading="Swap">
          <TwoCol>
            <Col>
              <P>Swap ZAI for ZAIv2</P>
            </Col>
            <Col>
              <LinkButton to="/dashboard/swap">Manage Swap</LinkButton>
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
