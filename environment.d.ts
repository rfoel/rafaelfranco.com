declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string
      CLIENT_SECRET: string
      DOMAIN_NAME: string
      PERSONAL_ACCESS_TOKEN: string
      REGION: string
      SECRET_COOKIE_PASSWORD: string
      STAGE: string
    }
  }
}

export {}
