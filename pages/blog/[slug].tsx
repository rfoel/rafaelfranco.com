import dayjs from 'dayjs'
import Markdown from 'markdown-to-jsx'
import type { NextApiRequest } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import readingTime from 'reading-time'
import styled from 'styled-components'
import { SWRConfig } from 'swr'
import 'dayjs/locale/pt-br'

import Badge from '../../components/Badge'
import Code from '../../components/Code'
import usePost from '../../hooks/usePost'
import { searchIssue } from '../../services/github'

dayjs.locale('pt-br')

const Container = styled.div``

const Article = styled.article`
  img {
    width: 100%;
    border-radius: 8px;
  }
`

const overrides = {
  code: Code,
  p: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  img: ({ src, alt }: { src: string; alt: string }) => (
    <Image
      alt={alt}
      src={src}
      blurDataURL={src}
      placeholder="blur"
      layout="responsive"
      width="100%"
      height="100%"
    />
  ),
}

const Post = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data } = usePost(slug as string)

  if (!data) return null

  const readTime = readingTime(data.bodyText)
  const minutes = Math.ceil(readTime.minutes)

  return (
    <Container>
      <h1>{data.title}</h1>
      <span>
        {dayjs(data.createdAt).format('D [de] MMMM, YYYY')} — {minutes}{' '}
        {minutes === 1 ? 'minuto' : 'minutos'} de leitura
      </span>
      {data.labels.map((label) => (
        <Badge {...label} />
      ))}
      <Article>
        <Markdown
          options={{
            overrides,
          }}
        >
          {data.body}
        </Markdown>
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
