/** @jsx jsx */
import { jsx, css, ThemeProvider } from '@emotion/react'
import { Web3ReactProvider } from '@web3-react/core'
import styled from '@emotion/styled'

import { RecoilRoot } from 'recoil'

import { useThemeName } from './components/Theme'
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

const Overlay = () => {
  return (
    <OverlayContainer>
      <ModalBox
        css={css`
          padding: ${rem(32)} ${rem(48)} ${rem(60)};
          width: 100%;
          max-width: ${rem(520)};

          display: flex;
          flex-direction: column;

          align-items: center;
        `}
      >
        <h4
          css={css`
            margin-bottom: ${rem(60)};
          `}
        >
          Version 2 is coming
        </h4>

        <Countdown
          date={1611007200 * 1000}
          renderer={({ days, hours, minutes, seconds }) => {
            return (
              <h3
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: space-around;

                  font-size: ${rem(40)};

                  margin-bottom: ${rem(60)};
                `}
              >
                <span>{days} D</span>
                <span>{hours} H</span>
                <span>{minutes} M</span>
                <span>{seconds} S</span>
              </h3>
            )
          }}
        />

        <h2
          css={css`
            margin-bottom: ${rem(12)};
            line-height: 1.2;
            font-size: ${rem(24)};
          `}
        >
          100:1 Swap
        </h2>

        <h2
          css={css`
            margin-bottom: ${rem(48)};
            line-height: 1.2;
            font-size: ${rem(24)};
          `}
        >
          5 Day Bootstrap
        </h2>

        <p>Swap avaialble soon</p>
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
