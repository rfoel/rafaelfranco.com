import type {
  BoxProps,
  CodeProps,
  HeadingProps,
  ImgProps,
} from '@chakra-ui/react'
import {
  Link,
  Code,
  Img,
  ListItem,
  OrderedList,
  UnorderedList,
  Box,
  Heading,
  ChakraProvider,
} from '@chakra-ui/react'
import type { LinkProps } from '@remix-run/react'
import Markdown from 'markdown-to-jsx'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { getHighlighter } from 'shiki'

export const renderToHtml = async (input: string) => {
  const highlighter = await getHighlighter({
    theme: 'css-variables',
  })

  return renderToString(
    ChakraProvider({
      children: Markdown({
        children: input,
        options: {
          overrides: {
            h1: { component: Heading, props: { size: '2xl' } as HeadingProps },
            h2: { component: Heading, props: { size: 'xl' } as HeadingProps },
            h3: { component: Heading, props: { size: 'lg' } as HeadingProps },
            h4: { component: Heading, props: { size: 'md' } as HeadingProps },
            h5: { component: Heading, props: { size: 'sm' } as HeadingProps },
            h6: { component: Heading, props: { size: 'xs' } as HeadingProps },
            p: { component: Box, props: { marginY: 4 } as BoxProps },
            ul: { component: UnorderedList, props: { marginY: 4 } },
            ol: { component: OrderedList, props: { marginY: 4 } },
            li: { component: ListItem, props: { marginY: 1 } },
            pre: {
              component: ({ children }) => {
                const lang = children.props.className?.replace('lang-', '')
                return createElement('div', {
                  dangerouslySetInnerHTML: {
                    __html:
                      highlighter.codeToHtml(children.props.children, {
                        lang,
                      }) + `<span>${lang}</span>`,
                  },
                  style: {
                    position: 'relative',
                  },
                })
              },
            },
            code: {
              component: Code,
              props: {} as CodeProps,
            },
            img: {
              component: Img,
              props: { borderRadius: 'lg', marginY: 16 } as ImgProps,
            },
            a: {
              component: Link,
              props: {
                color: 'green.500',
                target: '_blank',
                rel: 'noreferrer',
              } as LinkProps,
            },
          },
        },
      }),
    }),
  )
}
