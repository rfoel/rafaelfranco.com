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

  const readTime = Math.ceil(readingTime(discussion.bodyText).minutes)

  const svg = await satori(
    <div
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: '1200px 1200px',
        backgroundPosition: '0 -314',
        filter: 'brightness(0.05)',
        color: 'white',
        display: 'flex',
        height: '628px',
        fontFamily: 'Space Grotesk',
        width: '1200px',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          filter: 'brightness(1)',
          height: '628px',
          width: '1200px',
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
              fontSize: '56px',
            }}
          >
            {discussion.title}
          </h1>
          <p
            style={{
              fontSize: '24px',
            }}
          >
            {readTime} {readTime === 1 ? 'minuto' : 'minutos'} de leitura
          </p>
        </div>
        <p style={{ fontSize: '24px' }}>{request.url.replace('/og', '')}</p>
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
