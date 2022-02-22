import splitbee from '@splitbee/web'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'next/router'
import { darken } from 'polished'
import { useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components'
import { mutate } from 'swr'
import Turndown from 'turndown'

import useUser from '../hooks/useUser'

import { Button, ButtonPrimary } from './Button'
import Icon from './Icon'

const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;

  > button {
    margin-right: 8px;
  }
`

const EditorContainer = styled.div(
  ({ theme: { colors } }) => css`
    border: 1px solid ${darken(0.1, colors.bgDefault)};
    border-radius: 8px !important;
    font-size: 16px;
    cursor: text;
    flex: 1 0 100%;
    margin-bottom: 16px;
    width: 100%;

    .ProseMirror {
      outline: none;
      padding: 16px !important;

      p,
      pre {
        margin: 0 !important;
        margin-bottom: 8px;
      }

      code {
        padding: 4px 8px;
        background-color: ${darken(0.05, colors.bgDefault)};
        border-radius: 8px;
        font-family: monospace;
        font-size: 14px;
      }

      pre {
        background-color: ${darken(0.05, colors.bgDefault)};
        border-radius: 8px;
        padding: 8px 16px;

        code {
          background: none;
          color: inherit;
          font-size: 0.8rem;
          padding: 0;
        }
      }

      .is-editor-empty:first-child::before {
        color: ${darken(0.3, colors.bgDefault)};
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
        margin-bottom: 0px !important;
      }
    }
  `,
)

const MenuButton = styled.button<{ active: boolean }>(
  ({ active, theme: { colors } }) => css`
    background-color: ${colors.bgDefault};
    border: 0;
    border-radius: 8px;
    color: ${colors.fgDefault};
    cursor: pointer;
    margin-right: 8px;
    padding: 8px;

    ${active &&
    css`
      background-color: ${colors.bgPrimary};
      color: ${colors.fgPrimary};
    `}
  `,
)

const MenuBarContainer = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${darken(0.05, colors.bgDefault)};
    display: flex;
    justify-content: flex-start;
    padding: 8px 16px;
  `,
)

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <MenuBarContainer>
      <MenuButton
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Icon name="bold" size={14} />
      </MenuButton>
      <MenuButton
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icon name="italic" size={14} />
      </MenuButton>
      <MenuButton
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icon name="code" size={14} />
      </MenuButton>
    </MenuBarContainer>
  )
}

const Comment: React.FC<{ issueNumber: number; OAuthUrl: string }> = ({
  issueNumber,
  OAuthUrl,
}) => {
  const { data: user } = useUser()
  const router = useRouter()
  const { slug }: { slug?: string } = router.query
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlock,
      Placeholder.configure({
        placeholder: 'Deixe um comentário',
      }),
    ],
    content: '',
  })

  const handleSubmit = useCallback(async () => {
    if (user?.isLoggedIn) {
      if (editor?.getText()) {
        const turndown = new Turndown()

        const response = await fetch('/api/blog/comment', {
          method: 'POST',
          body: JSON.stringify({
            body: turndown.turndown(editor?.getHTML()),
            issueNumber,
          }),
        })
        if (response.ok) {
          const content = editor?.getText()
          editor.commands.clearContent()
          await mutate(`/api/blog/${slug}`)
          void splitbee.track('comment', { slug, content })
        }
      }
    } else {
      window.open(OAuthUrl, '_blank')
      void splitbee.track('oauth')
    }
  }, [OAuthUrl, editor, issueNumber, slug, user?.isLoggedIn])

  useEffect(() => {
    if (user?.isLoggedIn) {
      void handleSubmit()
    }
  }, [handleSubmit, user?.isLoggedIn])

  return (
    <Container>
      <EditorContainer onClick={() => editor?.chain().focus()}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} placeholder="Deixe um comentário" />
      </EditorContainer>
      <ButtonPrimary onClick={handleSubmit} type="button">
        Comentar
      </ButtonPrimary>
      <Button onClick={() => editor?.commands.clearContent()} type="button">
        Cancelar
      </Button>
    </Container>
  )
}

export default Comment
