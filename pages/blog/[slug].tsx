import dayjs from 'dayjs'
import type { NextApiRequest } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
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
  > * {
    margin-right: 4px;
  }
`

const Article = styled.article`
  margin: 48px 0;

  code,
  pre {
    border-radius: 8px !important;
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
              return !inline && match ? (
                <Prism
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={dracula}
                  showLineNumbers
                />
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
