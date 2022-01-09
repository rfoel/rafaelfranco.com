import Link from 'next/link'
import slugify from 'slugify'
import styled from 'styled-components'
import { SWRConfig } from 'swr'

import usePosts from '../../hooks/usePosts'
import { searchIssues } from '../../services/github'

type Post = {
  title: string
  createdAt: string
}

const Container = styled.div``

const Thumbnail = styled.div`
  border: 1px solid #ff596a;
  box-shadow: 0.25rem 0.25rem #ff596a;
  cursor: pointer;
  margin-bottom: 16px;
`

const Posts = () => {
  const { data } = usePosts()

  return (
    <Container>
      {data?.map((post: Post) => {
        const slug = slugify(post.title.toLowerCase())
        return (
          <Link key={slug} href={`blog/${slug}`}>
            <Thumbnail>
              <h2>{post.title}</h2>
              {post.createdAt}
            </Thumbnail>
          </Link>
        )
      })}
    </Container>
  )
}

const BlogIndex = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Posts />
    </SWRConfig>
  )
}

export const getServerSideProps = async () => {
  const posts = await searchIssues()
  return {
    props: {
      fallback: {
        [`/api/blog`]: posts,
      },
    },
  }
}

export default BlogIndex
