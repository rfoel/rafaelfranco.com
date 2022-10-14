import { Flex, Tag } from '@chakra-ui/react'
import type { Label } from '@octokit/graphql-schema'
import { readableColor } from 'polished'

const LabelList: React.FC<{ labels: Label[] }> = ({ labels }) => (
  <Flex flexWrap="wrap" gap={1}>
    {labels.map(label => (
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
