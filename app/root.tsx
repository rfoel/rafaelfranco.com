import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { css, withEmotionCache } from '@emotion/react'
import styled from '@emotion/styled'
import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'

import 'dayjs/locale/pt-br'

import { ServerStyleContext, ClientStyleContext } from './context'

dayjs.locale('pt-br')

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Rafael Franco',
  viewport: 'width=device-width,initial-scale=1',
})

const Html = styled.html(
  () => css`
    &,
    & > body {
      margin: 0;
      display: flex;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
      padding: var(--chakra-space-8);
    }

    .shiki + span {
      bottom: var(--chakra-space-2);
      color: var(--shiki-color-text);
      font-size: var(--chakra-fontSizes-sm);
      opacity: 0.8;
      position: absolute;
      right: var(--chakra-space-4);
    }

    &[data-theme='dark'] {
      :root {
        --shiki-color-text: #f8f8f2;
        --shiki-color-background: #282a36;
        --shiki-token-constant: #bd93f9;
        --shiki-token-string: #770000;
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
        --shiki-token-string: #770000;
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
    const serverStyleData = useContext(ServerStyleContext)
    const clientStyleData = useContext(ClientStyleContext)

    useEffect(() => {
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

export default function App() {
  return (
    <Document>
      <ColorModeScript />
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}
