import styled, { css } from 'styled-components'

const Anchor = styled.a<{ active?: boolean }>(
  ({ active, theme: { colors } }) => css`
    color: ${colors.bgPrimary};
    cursor: pointer;
    text-decoration: none;

    :visited {
      color: ${colors.bgPrimary};
    }

    :hover {
      font-weight: 700;
    }

    ${active &&
    css`
      font-weight: 700;
    `}
  `,
)

export default Anchor
