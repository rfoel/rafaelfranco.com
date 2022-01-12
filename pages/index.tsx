import styled from 'styled-components'

import Anchor from '../components/Anchor'

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const Index = () => {
  return (
    <Container>
      <p>Rafael Franco, engenheiro de software na Lemon Energia.</p>
      <Anchor href="https://github.com/rfoel">github</Anchor>
      <Anchor href="https://linkedin.com/in/rfoel">linkedin</Anchor>
      <Anchor href="https://twitter.com/rfoel">twitter</Anchor>
    </Container>
  )
}

export default Index
