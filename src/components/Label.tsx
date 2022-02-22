import { readableColor } from 'polished'
import styled, { css } from 'styled-components'

import { LabelsNode } from '../types'

const Container = styled.span<{ color: string }>(
  ({ color, theme: { colors } }) => {
    const backgroundColor = `#${color}`

    return css`
      background-color: ${backgroundColor};
      border-radius: 8px;
      color: ${readableColor(
        backgroundColor,
        colors.fgDefault,
        colors.fgPrimary,
      )};
      font-size: 12px;
      padding: 4px 8px;
    `
  },
)

const Badge: React.FC<LabelsNode> = ({ name, color }) => (
  <Container color={color}>{name}</Container>
)

export default Badge
