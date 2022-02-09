import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Anchor from './Anchor'
import Logo from './Logo'

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  max-width: 700px;
  padding: 32px;
  width: 100%;
`

const Nav = styled.nav`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr repeat(3, auto);
  width: 100%;

  :first-child {
    justify-self: start;
  }
`

const Header = () => {
  const router = useRouter()

  return (
    <Container>
      <Nav>
        <Link href="/" passHref>
          <Anchor>
            <Logo />
          </Anchor>
        </Link>
        <Link href="/blog" passHref prefetch>
          <Anchor active={router.pathname.includes('/blog')}>Blog</Anchor>
        </Link>
      </Nav>
    </Container>
  )
}

export default Header
