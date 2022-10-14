import { Box, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import slugify from 'slugify'

import type { SummaryPost } from 'types'
import { getDiscussions } from '~/services/github'

export const loader: LoaderFunction = async () => {
  const discussions = await getDiscussions()
  const posts = discussions.map(discussion => {
    const thumbnail = discussion.body.match(
      /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/,
    )?.[0]
    return {
      createdAt: discussion.createdAt,
      readingTime: Math.ceil(readingTime(discussion.bodyText).minutes),
      slug: slugify(discussion.title, { lower: true }),
      thumbnail,
      title: discussion.title,
    }
  })
  return json(posts)
}

const Index = () => {
  const loaderData = useLoaderData<SummaryPost[]>()
  return (
    <SimpleGrid columns={[1, 2, 3]}>
      {loaderData.map(post => (
        <Box
          as={Link}
          borderWidth={1}
          key={post.title}
          padding={4}
          to={`/blog/${post.slug}`}
        >
          {post.thumbnail ? (
            <Image marginBottom={3} src={post.thumbnail} />
          ) : null}
          <Heading fontSize="2xl" lineHeight={1} marginBottom={2}>
            {post.title}
          </Heading>
          <Text fontSize="sm">
            {post.readingTime} {post.readingTime === 1 ? 'minuto' : 'minutos'}{' '}
            de leitura
          </Text>
          <Text fontSize="sm">
            {dayjs(post.createdAt).format('D [de] MMMM, YYYY')}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default Index
