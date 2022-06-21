import styled, { css } from 'styled-components'

type AnchorProps = {
  active?: boolean
}

const Anchor = styled.a<AnchorProps>(
  ({ active, theme: { colors } }) => css`
    color: ${colors.bgPrimary};
    cursor: pointer;
    text-decoration: none;

    :visited {
      color: ${colors.bgPrimary};
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
