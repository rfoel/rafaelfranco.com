import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent: string
      background: string
      foreground: string
    }
    spacing(value: number): string
  }
}
