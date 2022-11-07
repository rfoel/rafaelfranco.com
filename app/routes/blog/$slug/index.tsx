import { Box, Heading, Text } from '@chakra-ui/react'
import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import slugify from 'slugify'

import type { Post } from 'types'
import LabelList from '~/components/LabelList'
import { searchDiscussion } from '~/services/github.server'
import { renderToHtml } from '~/services/markdown.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const slug = params.slug

  if (typeof slug !== 'string') return redirect('/blog')

  const discussion = await searchDiscussion(slug)

  if (!discussion) return redirect('/blog')

  const thumbnail = discussion.body.match(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
  )?.[0]
  const post = {
    createdAt: discussion.createdAt,
    readingTime: Math.ceil(readingTime(discussion.bodyText).minutes),
    slug: slugify(discussion.title, { lower: true }),
    thumbnail,
    title: discussion.title,
    labels: discussion.labels?.nodes?.map(label => label) || [],
    html: await renderToHtml(discussion.body),
    url: request.url,
  }

  return json(post)
}

export const meta: MetaFunction = ({ data }) => ({
  title: data.title,
  description: data.title,
  'og:type': 'website',
  'og:url': data.url,
  'og:title': data.title,
  'og:description': data.title,
  'og:image': `${data.url}/og`,
  'twitter:card': 'summary_large_image',
  'twitter:url': data.urk,
  'twitter:title': data.title,
  'twitter:description': data.title,
  'twitter:image': `${data.url}/og`,
})

const Index = () => {
  const loaderData = useLoaderData<Post>()
  return (
    <Box paddingY={16} width="100%">
      <Heading as="h1" marginBottom={4} size="2xl">
        {loaderData.title}
      </Heading>
      <Text marginBottom={4}>
        {dayjs(loaderData.createdAt).format('D [de] MMMM, YYYY')}
        {' • '}
        {loaderData.readingTime}{' '}
        {loaderData.readingTime === 1 ? 'minuto' : 'minutos'} de leitura
      </Text>
      <LabelList labels={loaderData.labels as Post['labels']} />
      <Box dangerouslySetInnerHTML={{ __html: loaderData.html }} />
    </Box>
  )
}

export default Index
