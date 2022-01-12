import styled, { css } from 'styled-components'

const Container = styled.span<{ color: string }>(({ color }) => {
  const backgroundColor = `#${color}`

  return css`
    border: 1px solid ${backgroundColor};
    box-shadow: 0.25rem 0.25rem ${backgroundColor};
    font-size: 0.9em;
    padding: 4px 8px;
  `
})

const Badge: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <Container color={color}>{name}</Container>
)

export default Badge
