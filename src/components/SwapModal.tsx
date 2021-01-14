/** @jsx jsx */
import React from 'react'
import { jsx, css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import BigNumber from 'bignumber.js'

import TabGroup, { tabStateAtom } from './TabGroup'
import Modal, {
  ModalColorRush,
  ModalContentWrap,
  ModalHeader,
  ModalTransaction,
  ModalHeading,
  EnableTout,
} from './Modal'
import { Spacer, BigButton, TableRow, Flex } from './Elements'
import {
  formInputAtomFamily,
  FigureInput,
  ActionLabel,
  HelpText,
} from './Forms'
import Figure from './Figure'

import { OLDZAI, ZAI } from '../constants/tokens'

import { useTransaction, useUserData } from '../hooks'
import { formatBN, toBaseUnitBN } from '../utils/number'
import { approveSome, burnAndSwap } from '../utils/web3'
import { rem } from 'polished'

const TAB_GROUP_NAME = 'swapModal'

enum Stages {
  Approve = 'Approve',
  Swap = 'Swap',
}

const Zai2 = () => (
  <React.Fragment>
    ZAI<sup>v2</sup>
  </React.Fragment>
)

const SwapModal = () => {
  const { balance, oldZaiBalance, oldZaiAllowance: allowance } = useUserData()

  const currentTab =
    useRecoilValue(tabStateAtom(TAB_GROUP_NAME)) || Stages.Approve
  const formName = `${TAB_GROUP_NAME}/${currentTab}`

  const formValue = useRecoilValue(formInputAtomFamily(formName))

  const [sendTransaction, blocked, txHash] = useTransaction()

  const tabMap = {
    [Stages.Approve]: {
      max: oldZaiBalance,
      label: 'Approve',
      action: (value: BigNumber) =>
        sendTransaction((cb) =>
          approveSome(
            OLDZAI.addr,
            ZAI.addr,
            toBaseUnitBN(value, OLDZAI.decimals),
            cb,
          ),
        ),
      helpText: (
        <span>
          Approve ZAI to be swapped for <Zai2 />
        </span>
      ),
    },
    [Stages.Swap]: {
      label: 'Swap',
      action: (value: BigNumber) =>
        sendTransaction((cb) => burnAndSwap(ZAI.addr, cb)),

      helpText: (
        <React.Fragment>
          Swap ZAI for <Zai2 /> at 100:1. <Zai2 /> can be bonded in the DAO or
          LP Pool in advance of the first epoch.
        </React.Fragment>
      ),
    },
  }

  const { max, label, action, helpText } = tabMap[currentTab]

  const valueOk =
    (currentTab === Stages.Swap && allowance.gte(100)) ||
    (formValue &&
      new BigNumber(formValue).lte(max) &&
      new BigNumber(formValue).gt(0))

  return (
    <Modal>
      <ModalColorRush>
        <ModalHeader>
          <ModalHeading>Swap ZAI</ModalHeading>
        </ModalHeader>

        <ModalContentWrap>
          {txHash ? (
            <ModalTransaction text="Confirming Transaction" txHash={txHash} />
          ) : currentTab === Stages.Approve ? (
            <React.Fragment>
              <FigureInput
                name={formName}
                max={max || new BigNumber(0)}
                unit="ZAI"
              />
              <Spacer size={16} />

              <Spacer size={24} />
            </React.Fragment>
          ) : (
            <EnableTout
              copy={
                allowance.gt(100)
                  ? `Ready to swap ${formatBN(allowance)} ZAI for ${formatBN(
                      allowance.div(100),
                    )} ZAIv2`
                  : `Approve your ZAI to be swapped for ZAIv2 to proceed`
              }
            />
          )}
        </ModalContentWrap>

        <TabGroup tabs={[Stages.Approve, Stages.Swap]} name={TAB_GROUP_NAME} />
      </ModalColorRush>

      <ModalContentWrap
        css={css`
          position: relative;
        `}
      >
        <Spacer size={28} />

        <BigButton
          css={css`
            width: 100%;
          `}
          disabled={blocked || !valueOk}
          invalid={blocked || !valueOk}
          onClick={() => {
            action(formValue)
          }}
        >
          <ActionLabel label={label} value={formValue} />
        </BigButton>

        <Spacer size={6} />
        <Flex
          css={css`
            justify-content: center;
            text-align: center;
          `}
        >
          <HelpText>{helpText}</HelpText>
        </Flex>

        <Spacer size={40} />

        <TableRow
          left="Zai Balance"
          right={
            <Figure
              num={oldZaiBalance}
              unit={
                <span
                  css={css`
                    margin-right: ${rem(12)};
                  `}
                >
                  ZAI
                </span>
              }
            />
          }
        />
        <TableRow
          left={
            <span>
              <Zai2 /> Balance
            </span>
          }
          right={<Figure num={balance} unit={<Zai2 />} />}
        />
      </ModalContentWrap>
    </Modal>
  )
}

export default SwapModal
