import dayjs from 'dayjs'
import readingTime from 'reading-time'
import styled from 'styled-components'

import { Post } from '../types'

const Header = styled.div`
  > * {
    margin: 0;
    margin-bottom: 16px;
  }
`

const PostHeader = ({ bodyText, createdAt, title }: Post) => {
  const readTime = readingTime(bodyText)
  const minutes = Math.ceil(readTime.minutes)

  return (
    <Header>
      <h2>{title}</h2>
      <div>
        {dayjs(createdAt).format('D [de] MMMM, YYYY')} — {minutes}{' '}
        {minutes === 1 ? 'minuto' : 'minutos'} de leitura
      </div>
    </Header>
  )
}

export default PostHeader
