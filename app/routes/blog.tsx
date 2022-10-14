import { Center, Container } from '@chakra-ui/react'
import { Outlet } from '@remix-run/react'

import Navbar from '~/components/Navbar'

const Index = () => (
  <Container
    display="flex"
    flexDirection="column"
    maxWidth="3xl"
    minHeight="100vh"
  >
    <Navbar />
    <Center flexGrow="1" width="100%">
      <Outlet />
    </Center>
  </Container>
)

export default Index
