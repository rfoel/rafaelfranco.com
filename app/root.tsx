import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styled, { css, ThemeProvider } from 'styled-components'

import theme from '~/utils/theme'

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600&display=swap',
      rel: 'stylesheet',
    },
    {
      rel: 'icon',
      href: '/favicon.icon',
    },
    {
      href: '/favicon-16x16.png',
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      href: '/favicon-32x32.png',
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
  ]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'rfoel.dev',
  viewport: 'width=device-width,initial-scale=1',
})

const Html = styled.html(
  () => css`
    &,
    body {
      margin: 0;
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 100%;
    }

    *,
    ::before,
    ::after {
      box-sizing: border-box;
      font-family: 'Source Code Pro', monospace;
      font-weight: 400;
    }
  `,
)

export default function App() {
  return (
    <Html lang="pt-br">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </Html>
  )
}
