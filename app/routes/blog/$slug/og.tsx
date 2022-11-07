import type { LoaderFunction } from '@remix-run/node'
import readingTime from 'reading-time'
import satori from 'satori'
import sharp from 'sharp'

import { searchDiscussion } from '~/services/github.server'

export const loader: LoaderFunction = async ({ request, params }) => {
  const slug = params.slug
  const url = new URL(request.url)

  if (typeof slug !== 'string') return new Response(null, { status: 404 })

  const discussion = await searchDiscussion(slug)

  if (!discussion) return new Response(null, { status: 404 })

  const thumbnail = discussion.body.match(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
  )?.[0]

  let base64 =
    'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

  if (thumbnail) {
    const buffer = await fetch(thumbnail).then(response =>
      response.arrayBuffer(),
    )
    base64 = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`
  }

  const readTime = Math.ceil(readingTime(discussion.bodyText).minutes)

  const svg = await satori(
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        height: '360px',
        width: '1200px',
      }}
    >
      <img alt={discussion.title} src={base64} height={360} width={360} />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '360px',
          width: '840px',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'Space Grotesk',
              fontSize: '36px',
            }}
          >
            {discussion.title}
          </h1>
          <p>
            {readTime} {readTime === 1 ? 'minuto' : 'minutos'} de leitura
          </p>
        </div>
        <p style={{ justifySelf: 'end' }}>{request.url.replace('/og', '')}</p>
      </div>
    </div>,
    {
      fonts: [
        {
          data: await fetch(`${url.origin}/SpaceGrotesk-Bold.ttf`).then(
            response => response.arrayBuffer(),
          ),
          name: 'Space Grotesk',
          style: 'normal',
        },
      ],
      height: 628,
      width: 1200,
    },
  )

  return new Response(await sharp(Buffer.from(svg)).jpeg().toBuffer(), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'max-age=31536000',
    },
  })
}
