declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      GITHUB_PERSONAL_ACCESS_TOKEN: string
      SECRET_COOKIE_PASSWORD: string
    }
  }
}

export {}
