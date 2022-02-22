import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import slugify from 'slugify'
import styled from 'styled-components'
import { SWRConfig } from 'swr'

import PostHeader from '../../components/PostHeader'
import usePosts from '../../hooks/usePosts'
import { searchIssues } from '../../services/github'

const Container = styled.div`
  width: 100%;
`

const Thumbnail = styled.div`
  border: 1px solid var(--red);
  box-shadow: 0.25rem 0.25rem var(--red);
  cursor: pointer;
  margin-bottom: 16px;
  width: 100%;
`

const Posts = () => {
  const { data } = usePosts()

  if (!data) return null

  return (
    <>
      <Head>
        <title>rfoel.dev | Blog</title>
      </Head>
      <Container>
        {data.search?.nodes?.map((node) => {
          const slug = slugify(node.title.toLowerCase())
          return (
            <Link key={slug} href={`blog/${slug}`} passHref>
              <Thumbnail>
                <PostHeader {...node} />
              </Thumbnail>
            </Link>
          )
        })}
      </Container>
    </>
  )
}

const BlogIndex: React.FC<{
  auth: { accessToken: string; login: string }
  fallback: Record<string, unknown>
}> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Posts />
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
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
