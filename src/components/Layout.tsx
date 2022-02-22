import styled, { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'

import fetcher from '../utils/fetcher'
import theme from '../utils/theme'

import Header from './Header'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Body = styled.div`
  flex: 1 0 100%;
  max-width: 700px;
  padding: 32px;
  background-color: #ffffff;
  width: 100%;

  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
`

const Layout: React.FC = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Body>{children}</Body>
      </Container>
    </ThemeProvider>
  </SWRConfig>
)

export default Layout
