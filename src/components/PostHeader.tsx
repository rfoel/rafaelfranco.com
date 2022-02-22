import dayjs from 'dayjs'
import readingTime from 'reading-time'
import styled from 'styled-components'
import 'dayjs/locale/pt-br'

import { SummaryIssuesNode } from '../types'

dayjs.locale('pt-br')

const Header = styled.div`
  width: 100%;

  > * {
    margin: 0;
    margin-bottom: 16px;
  }
`

const PostHeader: React.FC<SummaryIssuesNode> = (props) => {
  const readTime = readingTime(props.bodyText)
  const minutes = Math.ceil(readTime.minutes)

  return (
    <Header>
      <h3>{props.title}</h3>
      <div>
        {dayjs(props.createdAt).format('D [de] MMMM, YYYY')} — {minutes}{' '}
        {minutes === 1 ? 'minuto' : 'minutos'} de leitura
      </div>
    </Header>
  )
}

export default PostHeader
