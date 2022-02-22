import { darken } from 'polished'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import emoji from 'remark-emoji'
import styled, { css } from 'styled-components'

import Anchor from './Anchor'

const Container = styled.div<{ isPost?: boolean }>(
  ({ isPost, theme: { colors } }) => css`
    p,
    pre {
      margin: 0 !important;

      :not(:last-child) {
        margin-bottom: 8px !important;

        ${isPost &&
        css`
          margin-bottom: 32px !important;
        `}
      }
    }

    img {
      width: 100%;
      border-radius: 8px;
    }

    pre > pre {
      background-color: ${darken(0.05, colors.bgDefault)} !important;
      border: 0 !important;
      border-radius: 8px;
      padding: 8px 16px 8px !important;

      .linenumber {
        font-size: 0.7rem !important;
        font-style: normal !important;
      }
    }
  `,
)

const InlineCode = styled.code(
  ({ theme: { colors } }) => css`
    padding: 4px 8px;
    background-color: ${darken(0.05, colors.bgDefault)} !important;
    border-radius: 8px;
    font-family: monospace;
    font-size: 14px;
  `,
)

const Markdown: React.FC<{ isPost?: boolean }> = (props) => (
  <Container isPost={props.isPost}>
    <ReactMarkdown
      components={{
        a({ children, href }) {
          return (
            <Anchor href={href} target="_blank">
              {children}
            </Anchor>
          )
        },
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline ? (
            <Prism language={match?.[1]} style={ghcolors} showLineNumbers>
              {String(children).replace(/\n$/, '')}
            </Prism>
          ) : (
            <InlineCode className={className}>{children}</InlineCode>
          )
        },
      }}
      remarkPlugins={[emoji]}
    >
      {props?.children as string}
    </ReactMarkdown>
  </Container>
)

export default Markdown
