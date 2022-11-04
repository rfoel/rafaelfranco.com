import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { css, withEmotionCache } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
} from '@remix-run/react'
import * as Sentry from '@sentry/remix'
import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'

import 'dayjs/locale/pt-br'

import { version } from '../package.json'

import { ServerStyleContext, ClientStyleContext } from './context'
import theme from './theme'

dayjs.locale('pt-br')

export const loader: LoaderFunction = () => {
  return json({
    heapId: process.env.HEAP_ID,
    sentryDsn: process.env.SENTRY_DSN,
  })
}

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    title: 'Rafael Franco',
    viewport: 'width=device-width,initial-scale=1',
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap',
      rel: 'stylesheet',
    },
  ]
}

const Html = styled.html(
  () => css`
    &,
    & > body {
      margin: 0;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 100%;
    }

    @keyframes fade-in {
      100% {
        opacity: 1;
      }
    }

    .shiki {
      border-radius: var(--chakra-radii-lg);
      padding: var(--chakra-space-10) var(--chakra-space-4);
      overflow: scroll;

      code {
        counter-reset: step;
        counter-increment: step 0;
        display: inline-block;
        min-width: 100%;
      }

      code .line::before {
        content: counter(step);
        counter-increment: step;
        width: var(--chakra-space-4);
        margin-right: var(--chakra-space-4);
        display: inline-block;
        text-align: right;
        color: rgba(115, 138, 148, 0.4);
      }

      .line {
        position: relative;
        box-sizing: content-box;
        display: inline-block;
        margin: 0 calc(var(--chakra-space-4) * -1);
        padding: 0 calc(var(--chakra-space-4));
        min-width: 100%;

        ::after {
          content: '';
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: var(--chakra-space-1);
        }
      }

      .line.add {
        background-color: #50fa7b30;

        ::after {
          background-color: #50fa7b;
        }
      }

      .line.delete {
        background-color: #ff555530;

        ::after {
          background-color: #ff5555;
        }
      }

      .line.highlight {
        background-color: #8be9fd30;

        ::after {
          background-color: #8be9fd;
        }
      }
    }

    &[data-theme='dark'] {
      :root {
        --shiki-color-text: #f8f8f2;
        --shiki-color-background: #282a36;
        --shiki-token-constant: #bd93f9;
        --shiki-token-string: #f1fa8c;
        --shiki-token-comment: #6272a4;
        --shiki-token-keyword: #ff79c6;
        --shiki-token-parameter: #bd93f9;
        --shiki-token-function: #8be9fd;
        --shiki-token-string-expression: #f1fa8c;
        --shiki-token-punctuation: #f8f8f2;
        --shiki-token-link: #ffb86c;
      }

      .shiki-light {
        display: none;
      }
    }

    &[data-theme='light'] {
      :root {
        --shiki-color-text: #f8f8f2;
        --shiki-color-background: #282a36;
        --shiki-token-constant: #bd93f9;
        --shiki-token-string: #f1fa8c;
        --shiki-token-comment: #6272a4;
        --shiki-token-keyword: #ff79c6;
        --shiki-token-parameter: #bd93f9;
        --shiki-token-function: #8be9fd;
        --shiki-token-string-expression: #f1fa8c;
        --shiki-token-punctuation: #f8f8f2;
        --shiki-token-link: #ffb86c;
      }

      .shiki-dark {
        display: none;
      }
    }
  `,
)

interface DocumentProps {
  children: React.ReactNode
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const loaderData = useLoaderData()
    const serverStyleData = useContext(ServerStyleContext)
    const clientStyleData = useContext(ClientStyleContext)

    useEffect(() => {
      Sentry.init({
        dsn: loaderData.sentryDsn,
        tracesSampleRate: 1,
        release: version,
        integrations: [
          new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.remixRouterInstrumentation(
              useEffect,
              useLocation,
              useMatches,
            ),
          }),
        ],
      })
      emotionCache.sheet.container = document.head
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach(tag => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      clientStyleData?.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Html lang="pt-br">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
            heap.load(${loaderData.heapId});
            `,
            }}
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </Html>
    )
  },
)

export default Sentry.withSentry(function App() {
  return (
    <Document>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
})
