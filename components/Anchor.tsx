import styled, { css } from 'styled-components'

const Anchor = styled.a<{ active?: boolean }>(
  ({ active }) => css`
    cursor: pointer;
    text-decoration: none;

    :visited {
      color: initial;
    }

    ${active &&
    css`
      font-weight: 700;
    `}
  `,
)

export default Anchor
