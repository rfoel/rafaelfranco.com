import styled, { css } from 'styled-components'

const Anchor = styled.a<{ active?: boolean }>(
  ({ active }) => css`
    color: var(--blue);
    cursor: pointer;
    text-decoration: none;

    :visited {
      color: var(--blue);
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
