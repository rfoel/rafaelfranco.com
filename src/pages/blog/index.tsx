import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import slugify from 'slugify'
import styled from 'styled-components'
import { SWRConfig } from 'swr'

import PostHeader from '../../components/PostHeader'
import usePosts from '../../hooks/usePosts'
import { authenticate, searchIssues } from '../../services/github'
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
    <>
      <Head>
        <title>rfoel.dev | Blog</title>
      </Head>
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
    </>
  )
}

const BlogIndex: React.FC<{
  auth: { accessToken: string; login: string }
  fallback: Record<string, unknown>
}> = (props) => {
  if (typeof window !== 'undefined' && props.auth) {
    localStorage.setItem('accessToken', props.auth.accessToken)
    localStorage.setItem('login', props.auth.login)
    window.close()
  }

  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Posts />
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { code } = req.query

  let auth
  if (typeof code === 'string') {
    auth = await authenticate(code)
  }

  const posts = await searchIssues()

  return {
    props: {
      ...(auth && { auth }),
      fallback: {
        [`/api/blog`]: posts,
      },
    },
  }
}

export default BlogIndex
