import dayjs from 'dayjs'
import type { NextApiRequest } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import emoji from 'remark-emoji'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import 'dayjs/locale/pt-br'

import Badge from '../../components/Badge'
import PostHeader from '../../components/PostHeader'
import usePost from '../../hooks/usePost'
import { searchIssue } from '../../services/github'

dayjs.locale('pt-br')

const Container = styled.div``

const InlineCode = styled.code`
  padding: 4px 8px;
  background-color: var(--light);
  border-radius: 8px;
  color: var(--blue);
  font-family: monospace;
  font-size: 14px;
`

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-bottom: 8px;
    margin-right: 8px;
  }
`

const Article = styled.article`
  margin: 48px 0;

  pre {
    border-radius: 0 !important;
    box-shadow: 0.25rem 0.25rem var(--red);
  }

  img {
    width: 100%;
    border-radius: 8px;
  }
`

const Post = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data } = usePost(slug as string)

  if (!data) return null

  return (
    <>
      <Head>
        <title>rfoel.dev | {data.title}</title>
      </Head>
      <Container>
        <PostHeader {...data} />
        <Labels>
          {data.labels.map((label) => (
            <Badge key={label.name} {...label} />
          ))}
        </Labels>
        <Article>
          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline ? (
                  <Prism language={match?.[1]} style={ghcolors} showLineNumbers>
                    {String(children).replace(/\n$/, '')}
                  </Prism>
                ) : (
                  <InlineCode className={className}>{children}</InlineCode>
                )
              },
            }}
            remarkPlugins={[emoji]}
          >
            {data.body}
          </ReactMarkdown>
        </Article>
      </Container>
    </>
  )
}

const BlogPost = (props: { fallback: Record<string, unknown> }) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Post />
    </SWRConfig>
  )
}

export const getServerSideProps = async (req: NextApiRequest) => {
  const { slug } = req.query
  const post = await searchIssue(slug as string)
  return {
    props: {
      fallback: {
        [`/api/blog/${slug}`]: post,
      },
    },
  }
}

export default BlogPost
