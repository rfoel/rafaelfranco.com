import dayjs from 'dayjs'
import styled, { css } from 'styled-components'

import useContributions from '../hooks/useContributions'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 4px;
  grid-row-gap: 4px;
`

const Day = styled.span<{ color: string }>(
  ({ color }) => css`
    background-color: ${color};
    height: 8px;
    width: 8px;
  `,
)

const Contributions = () => {
  const from = dayjs().startOf('day').subtract(7, 'weeks').toISOString()
  const to = dayjs().endOf('day').toISOString()
  const { data } = useContributions(from, to)

  return (
    <Grid>
      {data?.map((color) => (
        <Day color={color} />
      ))}
    </Grid>
  )
}

export default Contributions
