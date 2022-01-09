import { readableColor } from 'polished'
import styled, { css } from 'styled-components'

const Container = styled.span<{ color: string }>(({ color }) => {
  const backgroundColor = `#${color}`
  return css`
    background-color: ${backgroundColor};
    border-radius: 40px;
    color: ${readableColor(backgroundColor, '#fff', '#000')};
    font-size: 0.9em;
    padding: 4px 8px;
  `
})

const Badge: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <Container color={color}>{name}</Container>
)

export default Badge
