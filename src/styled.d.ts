import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bgDefault: string
      fgDefault: string
      bgPrimary: string
      fgPrimary: string
    }
  }
}
