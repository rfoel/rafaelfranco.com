declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN_NAME: string
      HOSTED_ZONE_ID: string
      PERSONAL_ACCESS_TOKEN: string
    }
  }
}

export {}
