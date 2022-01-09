import styled from 'styled-components'
import { SWRConfig } from 'swr'

import fetcher from '../utils/fetcher'

import Footer from './Footer'
import Header from './Header'

const Container = styled.div``

const Body = styled.div`
  flex: 1 0 100%;
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
