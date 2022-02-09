import Link from 'next/link'
import slugify from 'slugify'
import styled from 'styled-components'
import { SWRConfig } from 'swr'

import PostHeader from '../../components/PostHeader'
import usePosts from '../../hooks/usePosts'
import { searchIssues } from '../../services/github'
import { Post } from '../../types'

const Container = styled.div`
  width: 100%;
`

const Thumbnail = styled.div`
  border: 1px solid var(--red);
  box-shadow: 0.25rem 0.25rem var(--red);
  cursor: pointer;
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
`

const Posts = () => {
  const { data } = usePosts()

  return (
    <Container>
      {data?.map((post: Post) => {
        const slug = slugify(post.title.toLowerCase())
        return (
          <Link key={slug} href={`blog/${slug}`} passHref>
            <Thumbnail>
              <PostHeader {...post} />
            </Thumbnail>
          </Link>
        )
      })}
    </Container>
  )
}

const BlogIndex = (props: { fallback: Record<string, unknown> }) => {
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
