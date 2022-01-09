import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.header``

const Header = () => (
  <Container>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
  </Container>
)

export default Header
