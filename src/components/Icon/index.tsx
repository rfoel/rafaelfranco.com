import styled, { css } from 'styled-components'

import * as icons from './icons'

const Container = styled.div<{ size: number }>(
  ({ size }) =>
    css`
      height: ${size}px;
      max-height: ${size}px;
      max-width: ${size}px;
      width: ${size}px;

      svg {
        height: ${size}px;
        max-height: ${size}px;
        max-width: ${size}px;
        width: ${size}px;
      }
    `,
)

export type IconName = 'bold' | 'italic' | 'strike' | 'code' | 'smile'

const Icon = ({
  className,
  name,
  size = 16,
}: {
  className?: string
  name: IconName
  size?: number
}) => {
  const icon = icons[name]
  return (
    <Container className={className} size={size}>
      <svg viewBox={icon.viewBox} xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d={icon.path}></path>
      </svg>
    </Container>
  )
}

export default styled(Icon)``
