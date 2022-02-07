declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN_NAME: string
      PERSONAL_ACCESS_TOKEN: string
    }
  }
}

export {}
