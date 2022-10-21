import {
  Box,
  ChakraProvider,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import parseNumericRange from 'parse-numeric-range'
import React from 'react'
import { renderToString } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'
import { getHighlighter } from 'shiki'

type LineOption = {
  line: number
  classes?: string[]
}

export const renderToHtml = async (markdown: string) => {
  const highlighter = await getHighlighter({
    theme: 'css-variables',
  })

  return renderToString(
    <ChakraProvider>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <Heading marginY={4} size="2xl" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <Heading marginY={4} size="xl" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <Heading marginY={4} size="lg" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <Heading marginY={4} size="md" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <Heading marginY={4} size="sm" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <Heading marginY={4} size="xs" {...props} />
          ),
          p: ({ node, ...props }) => <Text marginY={4} {...props} />,
          ol: OrderedList,
          ul: UnorderedList,
          li: ListItem,
          code: Code,
          a: ({ node, ...props }) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <Link
              {...props}
              color="green.500"
              target="_blank"
              rel="noreferrer"
            />
          ),
          pre: ({ children, node }) => {
            const {
              className,
              children: [code],
            } = Array.isArray(children)
              ? (children[0] as React.ReactElement)?.props
              : (children as React.ReactElement).props

            const lang = className?.replace('language-', '')
            let lineOptions: LineOption[] = []
            let filePath: string = ''

            if (typeof node.children[0].data?.meta === 'string') {
              const { path, ...options } = Object.fromEntries([
                ...new URLSearchParams(node.children[0].data?.meta).entries(),
              ])
              filePath = path
              lineOptions = Object.entries(options).reduce(
                (acc, [className, lines]) => {
                  const parsedLines = parseNumericRange(lines)
                  return [
                    ...acc,
                    ...parsedLines.map((line) => ({
                      classes: [className],
                      line,
                    })),
                  ]
                },
                [] as LineOption[],
              )
            }

            return (
              <Box position="relative">
                <div
                  dangerouslySetInnerHTML={{
                    __html: highlighter.codeToHtml(code.replace(/\n$/, ''), {
                      lang,
                      lineOptions,
                    }),
                  }}
                />
                {filePath ? (
                  <Box
                    color="whiteAlpha.700"
                    position="absolute"
                    top={5}
                    left="50%"
                    transform="translate(-50%, -50%)"
                  >
                    {filePath}
                  </Box>
                ) : null}
                {lang ? (
                  <Box
                    color="whiteAlpha.700"
                    position="absolute"
                    bottom={2}
                    right={4}
                  >
                    {lang}
                  </Box>
                ) : null}
              </Box>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </ChakraProvider>,
  )
}
