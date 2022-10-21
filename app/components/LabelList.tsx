import { Flex, Tag } from '@chakra-ui/react'
import { readableColor } from 'polished'

import type { Post } from 'types'

const LabelList: React.FC<Pick<Post, 'labels'>> = ({ labels }) => (
  <Flex flexWrap="wrap" gap={1}>
    {labels.map((label) => (
      <Tag
        backgroundColor={`#${label.color}`}
        color={readableColor(`#${label.color}`, 'white', 'black')}
        key={label.name}
      >
        {label.name}
      </Tag>
    ))}
  </Flex>
)

export default LabelList
