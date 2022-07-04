import styled, { css } from 'styled-components'

type AnchorProps = {
  active?: boolean
}

const Anchor = styled.a<AnchorProps>(
  ({ active, theme: { colors } }) => css`
    color: ${colors.accent};
    cursor: pointer;
    text-decoration: none;

    :visited {
      color: ${colors.accent};
    }

    :hover {
      font-weight: 600;
    }

    ${active &&
    css`
      font-weight: 600;
    `}
  `,
)

export default Anchor
