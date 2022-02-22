import splitbee from '@splitbee/web'
import { useRouter } from 'next/router'
import { darken, transparentize } from 'polished'
import { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { mutate } from 'swr'

import useUser from '../hooks/useUser'
import { ReactionsNode } from '../types'

import Icon from './Icon'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  width: auto;
`

const Reaction = styled.div<{ active?: boolean }>(
  ({ active, theme: { colors } }) => css`
    align-items: center;
    background-color: ${darken(0.05, colors.bgDefault)} !important;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    font-family: monospace;
    font-size: 14px;
    justify-content: center;
    margin-bottom: 8px;
    margin-right: 8px;
    min-height: 32px;
    padding: 4px 8px;
    user-select: none;

    ${active &&
    css`
      background-color: ${transparentize(0.75, colors.bgPrimary)} !important;
    `}
  `,
)

const map: { [key: string]: { content: string; label: string } } = {
  THUMBS_UP: { content: '+1', label: '👍' },
  THUMBS_DOWN: { content: '-1', label: '👎' },
  LAUGH: { content: 'laugh', label: '😄' },
  HOORAY: { content: 'hooray', label: '🎉' },
  CONFUSED: { content: 'confused', label: '😕' },
  HEART: { content: 'heart', label: '❤️' },
  ROCKET: { content: 'rocket', label: '🚀' },
  EYES: { content: 'eyes', label: '👀' },
}

const ReactionsComponent: React.FC<{
  hideEmptyReactions?: boolean
  commentId?: number
  issueNumber?: number
  reactions: ReactionsNode[]
  OAuthUrl: string
}> = ({
  hideEmptyReactions = true,
  commentId,
  issueNumber,
  reactions,
  OAuthUrl,
}) => {
  const [toggled, setToggled] = useState(false)
  const [reactionContent, setReactionContent] = useState('')
  const { data: user } = useUser()
  const router = useRouter()
  const { slug }: { slug?: string } = router.query

  const addReaction = useCallback(
    async (content: string) => {
      if (user?.isLoggedIn) {
        const response = await fetch('/api/blog/reaction', {
          method: 'POST',
          body: JSON.stringify({
            commentId,
            content,
            issueNumber,
          }),
        })
        if (response.ok) {
          await mutate(`/api/blog/${slug}`)
          void splitbee.track('add reaction', { slug, content })
        }
      } else {
        setReactionContent(content)
        window.open(OAuthUrl, '_blank')
        void splitbee.track('oauth')
      }
    },
    [OAuthUrl, commentId, issueNumber, slug, user?.isLoggedIn],
  )

  const deleteReaction = async (reactionId: number, content: string) => {
    const response = await fetch('/api/blog/reaction', {
      method: 'DELETE',
      body: JSON.stringify({
        commentId,
        issueNumber,
        reactionId,
      }),
    })
    if (response.ok) {
      await mutate(`/api/blog/${slug}`)
      void splitbee.track('delete reaction', { slug, content })
    }
  }

  useEffect(() => {
    if (user?.isLoggedIn && reactionContent) {
      void addReaction(reactionContent)
    }
  }, [addReaction, reactionContent, user?.isLoggedIn])

  const reactionsCount = reactions.reduce(
    (acc, { content }) => ({ ...acc, [content]: acc[content] + 1 }),
    {
      THUMBS_UP: 0,
      THUMBS_DOWN: 0,
      LAUGH: 0,
      HOORAY: 0,
      CONFUSED: 0,
      HEART: 0,
      ROCKET: 0,
      EYES: 0,
    },
  )

  return (
    <Container>
      {hideEmptyReactions && (
        <Reaction onClick={() => setToggled(!toggled)}>
          <Icon name="smile" />
        </Reaction>
      )}
      {Object.entries(reactionsCount)
        .filter(
          ([, value]) => toggled || (!toggled && value) || !hideEmptyReactions,
        )
        .map(([key, value]) => {
          const reaction = reactions.find(
            (reaction) =>
              reaction.content === key && reaction.user.login === user?.login,
          )
          const onClick = () =>
            reaction
              ? deleteReaction(reaction.databaseId, reaction.content)
              : addReaction(map[key].content)

          return (
            <Reaction active={Boolean(reaction)} key={key} onClick={onClick}>
              {map[key].label} {value}
            </Reaction>
          )
        })}
    </Container>
  )
}

export default ReactionsComponent
