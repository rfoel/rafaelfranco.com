import Link from 'next/link'
import slugify from 'slugify'
import styled from 'styled-components'

import usePosts from '../../hooks/usePosts'

type Post = {
  title: string
  createdAt: string
}

const Container = styled.div``

const Thumbnail = styled.div`
  border: 1px solid #ff596a;
  box-shadow: 0.25rem 0.25rem #ff596a;
  margin-bottom: 16px;
  cursor: pointer;
`

const Blog = () => {
  const { data } = usePosts()

  return (
    <Container>
      {data?.map((post: Post) => (
        <Link href={`blog/${slugify(post.title)}`}>
          <Thumbnail>
            <h2>{post.title}</h2>
            {post.createdAt}
          </Thumbnail>
        </Link>
      ))}
    </Container>
  )
}

export default Blog
