import Markdown from 'markdown-to-jsx'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import usePost from '../../hooks/usePost'

const Container = styled.div``

const Article = styled.article`
  img {
    width: 100%;
    border-radius: 8px;
  }
`

const Index = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data } = usePost(slug as string)

  if (!data) return null

  return (
    <Container>
      <h1>{data.title}</h1>
      <span>{data.createdAt}</span>
      <Article>
        <Markdown>{data.body}</Markdown>
      </Article>
    </Container>
  )
}

export default Index
