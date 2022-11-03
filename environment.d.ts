declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      GITHUB_PERSONAL_ACCESS_TOKEN: string
      HEAP_ID: string
      SECRET_COOKIE_PASSWORD: string
      SENTRY_DSN: string
    }
  }
}

export {}
