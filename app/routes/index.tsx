import { Center, Container, Link, Text } from '@chakra-ui/react'

import Navbar from '~/components/Navbar'

const Index = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      maxWidth="3xl"
      minHeight="100vh"
    >
      <Navbar />
      <Center
        display="flex"
        flexDirection="column"
        flexGrow="1"
        fontSize="xl"
        padding={2}
        textAlign="center"
      >
        <Text marginBottom={4}>
          Engenheiro de software na{' '}
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
          GitHub
        </Link>
        <Link
          color="green.500"
          href="https://linkedin.com/in/rfoel"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </Link>
        <Link
          color="green.500"
          href="https://twitter.com/rfoel"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </Link>
      </Center>
    </Container>
  )
}

export default Index
