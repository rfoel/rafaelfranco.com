import dayjs from 'dayjs'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import 'dayjs/locale/pt-br'

import Badge from '../../components/Badge'
import Comment from '../../components/Comment'
import Comments from '../../components/Comments'
import Markdown from '../../components/Markdown'
import PostHeader from '../../components/PostHeader'
import Reactions from '../../components/Reactions'
import usePost from '../../hooks/usePost'
import { getOAuthUrl, searchIssue } from '../../services/github'

dayjs.locale('pt-br')

const Container = styled.div``

const CommentSection = styled.div`
  margin-top: 16px;
`

const Body = styled.div`
  margin: 32px 0px;
`

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin-bottom: 8px;
    margin-right: 8px;
  }
`

const Post: React.FC<{ OAuthUrl: string }> = ({ OAuthUrl }) => {
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
        <Body>
          <Markdown isPost>{data.body}</Markdown>
        </Body>
        <Reactions
          issueNumber={data.issueNumber}
          hideEmptyReactions={false}
          reactions={data.reactions}
          OAuthUrl={OAuthUrl}
        />
        <CommentSection>
          <Comment issueNumber={data.issueNumber} OAuthUrl={OAuthUrl} />
          <Comments
            comments={data.comments}
            totalComments={data.totalComments}
            OAuthUrl={OAuthUrl}
          />
        </CommentSection>
      </Container>
    </>
  )
}

const BlogPost: React.FC<{
  OAuthUrl: string
  fallback: Record<string, unknown>
}> = (props) => {
  return (
    <SWRConfig value={{ fallback: props.fallback }}>
      <Post OAuthUrl={props.OAuthUrl} />
    </SWRConfig>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { slug } = req.query

  const OAuthUrl = getOAuthUrl()
  const post = await searchIssue(slug as string)

  return {
    props: {
      OAuthUrl,
      fallback: {
        [`/api/blog/${slug}`]: post,
      },
    },
  }
}

export default BlogPost
