import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import Anchor from './Anchor'
import Logo from './Logo'

const Container = styled.nav`
  padding: 48px 0;
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr repeat(3, fit-content(50px));
  grid-gap: 20px;
  justify-items: end;
  max-width: 600px;
  width: 100%;

  > :first-child {
    grid-column: 1 / 2;
    justify-self: start;
  }
`

const Header = () => {
  const router = useRouter()

  return (
    <Container>
      <Link href="/">
        <Anchor>
          <Logo />
        </Anchor>
      </Link>
      <Link href="/">
        <Anchor active={router.pathname === '/'}>Início</Anchor>
      </Link>
      <Link href="/blog">
        <Anchor active={router.pathname.includes('/blog')}>Blog</Anchor>
      </Link>
    </Container>
  )
}

export default Header
