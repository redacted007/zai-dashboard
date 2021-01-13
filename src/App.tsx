/** @jsx jsx */
import { jsx, css, ThemeProvider } from '@emotion/react'
import { Web3ReactProvider } from '@web3-react/core'
import styled from '@emotion/styled'

import { RecoilRoot } from 'recoil'

import { coolStuff, useThemeName } from './components/Theme'
import Styles from './components/Styles'
import Routes from './components/Routes'
import { Main, SiteWrapper } from './components/Layout'
import Footer from './components/Footer'
import AutoConnect from './components/AutoConnect'

import { ModalBox } from './components/Modal'

import Countdown from 'react-countdown'

import { getLibrary } from './utils/infura'

import { makeTheme } from './components/Theme'
import { lightTheme, darkTheme, colorsGreen, colorsGreenBW } from './theme'
import { rem } from 'polished'

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

  background: rgba(0, 0, 0, 0.8);
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

// .time {
//   letter-spacing: 0.05em;
//   font-size: 80px;
//   padding: 5px 0;
// }
// .date {
//   letter-spacing: 0.1em;
//   font-size: 24px;
// }
// .text {
//   letter-spacing: 0.1em;
//   font-size: 12px;
//   padding: 20px 0 0;
// }

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
        date={1611007200 * 1000}
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
  return (
    <OverlayContainer>
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
              <Clock></Clock>

              <p
                css={css`
                  opacity: 0.92;
                  font-size: ${rem(12)};

                  margin-top: ${rem(64)};
                `}
              >
                Permissionless swap of ZAI v1 for ZAI v2 (100:1) available soon
              </p>
            </div>
          </div>
        </ColorRush>
      </ModalBox>
    </OverlayContainer>
  )
}

const AppRoot = () => {
  const [themeName] = useThemeName()

  const theme =
    themeName === 'light'
      ? makeTheme(lightTheme, {
          colorPairs: colorsGreen,
        })
      : makeTheme(darkTheme, { colorPairs: colorsGreenBW })

  return (
    <ThemeProvider theme={theme}>
      <Styles />

      <SiteWrapper>
        <AutoConnect />
        <Main>
          <Routes />
        </Main>

        <Footer />

        <Overlay />
      </SiteWrapper>
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <RecoilRoot>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppRoot />
      </Web3ReactProvider>
    </RecoilRoot>
  )
}

export default App
