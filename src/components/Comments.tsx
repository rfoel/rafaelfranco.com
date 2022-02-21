import dayjs from 'dayjs'
import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'

import { Comment } from '../types'

import Markdown from './Markdown'
import Reactions from './Reactions'

const Container = styled.div(
  ({ theme: { colors } }) =>
    css`
      border: 1px solid ${lighten(0.65, colors.fgDefault)};
      border-radius: 8px;
      margin-bottom: 32px;
    `,
)

const Avatar = styled.img`
  border-radius: 40px;
  height: 40px;
  margin-right: 16px;
  width: 40px;
`

const Header = styled.div(
  ({ theme: { colors } }) => css`
    align-items: center;
    background-color: ${darken(0.05, colors.bgDefault)};
    display: flex;
    padding: 16px;
    width: 100%;

    > :nth-child(2) {
      flex: 1;
      font-weight: 900;
    }

    > :nth-child(3) {
      color: ${colors.fgDefault};
      font-size: 0.9rem;
    }
  `,
)

const Body = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.bgDefault};
    padding: 16px;
    width: 100%;
  `,
)

const Footer = styled.div(
  () => css`
    padding: 16px;
    width: 100%;
  `,
)

const Comments: React.FC<{
  comments: Comment[]
  OAuthUrl: string
  totalComments: number
}> = ({ comments, OAuthUrl, totalComments }) => (
  <>
    <h3>
      {totalComments} comentário{totalComments === 1 ? '' : 's'}
    </h3>
    {comments.map((comment) => (
      <Container key={comment.id}>
        <Header>
          <Avatar src={comment.avatar} />
          <span>{comment.author}</span>
          <span>{dayjs(comment.createdAt).format('DD [de] MMMM, YYYY')}</span>
        </Header>
        <Body key={comment.createdAt}>
          <Markdown>{comment.body}</Markdown>
        </Body>
        <Footer>
          <Reactions
            commentId={comment.id}
            reactions={comment.reactions}
            OAuthUrl={OAuthUrl}
          />
        </Footer>
      </Container>
    ))}
  </>
)

export default Comments
