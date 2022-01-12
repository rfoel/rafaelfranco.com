import styled from 'styled-components'
import { SWRConfig } from 'swr'

import fetcher from '../utils/fetcher'

import Footer from './Footer'
import Header from './Header'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0 24px;
`

const Body = styled.div`
  flex: 1 0 100%;
  max-width: 600px;
`

const Layout: React.FC = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
    }}
  >
    <Container>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Container>
  </SWRConfig>
)

export default Layout
