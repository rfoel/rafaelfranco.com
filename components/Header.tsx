import Link from 'next/link'
import styled from 'styled-components'

import Contributions from './Contributions'

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Header = () => (
  <Container>
    <Contributions />
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </Container>
)

export default Header
