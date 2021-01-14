/** @jsx jsx */
import { useHistory } from 'react-router-dom'
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import { rem } from 'polished'
import Countdown from 'react-countdown'

import { coolStuff } from './Theme'

import { ModalBox, ModalBackground } from './Modal'

import { BigButton, Spacer } from './Elements'

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
`

const ColorRush = styled.div`
  ${coolStuff}

  width: 100%;
  height: 100%;

  & > * {
    position: relative;
    z-index: 1;
  }
`

const Clock = () => {
  return (
    <div
      css={css`
        width: 100%;
        font-family: 'Share Tech Mono', monospace;
        color: #ffffff;
        text-align: center;

        color: #daf6ff;
        text-shadow: 0 0 ${rem(24)} rgba(10, 175, 230, 1),
          0 0 ${rem(24)} rgba(10, 175, 230, 0);
      `}
    >
      <p
        css={css`
          letter-spacing: 0.1em;
          font-size: ${rem(14)};

          margin-bottom: ${rem(12)};
        `}
      >
        ZAI Version 2
      </p>

      <Countdown
        date={1611014400 * 1000}
        renderer={({ days, hours, minutes, seconds }) => {
          return (
            <p
              css={css`
                font-family: 'Share Tech Mono', monospace;
                color: #ffffff;
                text-align: center;

                font-weight: 100;

                letter-spacing: 0em;
                font-size: ${rem(62)};
                padding: ${rem(5)} 0;

                width: 100%;
                display: flex;
                justify-content: space-around;
                color: #fff;

                margin-bottom: ${rem(34)};
              `}
            >
              <span>{days}D</span>:<span>{hours}H</span>:<span>{minutes}M</span>
              :<span>{seconds}S</span>
            </p>
          )
        }}
      />

      <p
        css={css`
          letter-spacing: 0.1em;
          font-size: ${rem(24)};

          margin-bottom: ${rem(42)};
        `}
      >
        Fair Launch - No Premine
      </p>
      <p
        css={css`
          margin-bottom: ${rem(12)};
        `}
      >
        ZAI:DAI peg
      </p>
      <p
        css={css`
          margin-bottom: ${rem(12)};
        `}
      >
        5 day initial bootstrap
      </p>
    </div>
  )
}

const Overlay = () => {
  const history = useHistory()
  const onClickOut = () => {
    history.push('/dashboard')
  }
  return (
    <OverlayContainer>
      <ModalBackground onClick={onClickOut} />
      <ModalBox
        css={css`
          width: 100%;
          max-width: ${rem(640)};

          overflow: hidden;

          box-shadow: 0 ${rem(18)} ${rem(48)} rgba(0, 0, 0, 0.2);
        `}
      >
        <ColorRush>
          <div
            css={css`
              padding: ${rem(24)} ${rem(24)} ${rem(24)};
            `}
          >
            <div
              css={css`
                background-color: #fff;
                border-radius: ${rem(8)};
                width: 100%;
                display: flex;
                flex-direction: column;

                align-items: center;

                padding: ${rem(40)} ${rem(32)} ${rem(32)};

                background: #0f3854;
                background: radial-gradient(
                  ellipse at center,
                  #0a2e38 0%,
                  #000000 70%
                );
                background-size: 100%;

                color: #fff;
              `}
            >
              <Clock />
              <Spacer size={40} />
              <BigButton onClick={() => history.push('/swap')}>
                Swap ZAI v1 for ZAI v2 (100:1)
              </BigButton>
              <Spacer />
            </div>
          </div>
        </ColorRush>
      </ModalBox>
    </OverlayContainer>
  )
}

export default Overlay
