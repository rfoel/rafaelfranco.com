import { Center, Link, Text } from '@chakra-ui/react'

const Index = () => {
  return (
    <Center
      display="flex"
      flexDirection="column"
      fontSize="xl"
      minH="100vh"
      padding={2}
      textAlign="center"
    >
      <Text marginBottom={4}>
        Rafael Franco, engenheiro de software na{' '}
        <Link
          color="green.500"
          href="https://energialemon.com.br"
          target="_blank"
          rel="noreferrer"
        >
          Lemon Energia
        </Link>
        .
      </Text>
      <Link
        color="green.500"
        href="https://github.com/rfoel"
        target="_blank"
        rel="noreferrer"
      >
        github
      </Link>
      <Link
        color="green.500"
        href="https://linkedin.com/in/rfoel"
        target="_blank"
        rel="noreferrer"
      >
        linkedin
      </Link>
      <Link
        color="green.500"
        href="https://twitter.com/rfoel"
        target="_blank"
        rel="noreferrer"
      >
        twitter
      </Link>
    </Center>
  )
}

export default Index
