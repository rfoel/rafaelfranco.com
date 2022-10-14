import { Box, Heading, Text } from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import slugify from 'slugify'

import type { Post } from 'types'
import LabelList from '~/components/LabelList'
import { searchDiscussion } from '~/services/github'
import { renderToHtml } from '~/services/markdown.server'

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug

  if (typeof slug !== 'string') return redirect('/blog')

  const discussion = await searchDiscussion(slug)

  if (!discussion) return redirect('/blog')

  const thumbnail = discussion.body.match(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/,
  )?.[0]
  const post = {
    createdAt: discussion.createdAt,
    readingTime: Math.ceil(readingTime(discussion.bodyText).minutes),
    slug: slugify(discussion.title, { lower: true }),
    thumbnail,
    title: discussion.title,
    labels: discussion.labels?.nodes?.map(label => label) || [],
    html: await renderToHtml(discussion.body),
  }

  return json(post)
}

const Index = () => {
  const loaderData = useLoaderData<Post>()
  return (
    <Box paddingY={16}>
      <Heading marginBottom={4}>{loaderData.title}</Heading>
      <Text marginBottom={4}>
        {dayjs(loaderData.createdAt).format('D [de] MMMM, YYYY')}
        {' • '}
        {loaderData.readingTime}{' '}
        {loaderData.readingTime === 1 ? 'minuto' : 'minutos'} de leitura
      </Text>
      <LabelList labels={loaderData.labels} />
      <Box dangerouslySetInnerHTML={{ __html: loaderData.html }} />
    </Box>
  )
}

export default Index
