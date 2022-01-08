import styled from 'styled-components'
import { SWRConfig } from 'swr'

import fetcher from '../utils/fetcher'

import Header from './Header'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Body = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
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
    </Container>
  </SWRConfig>
)

export default Layout
