import { extendTheme } from '@chakra-ui/react'

const defaultFont = `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`

const theme = extendTheme({
  fonts: {
    heading: defaultFont,
    body: defaultFont,
  },
})

export default theme
