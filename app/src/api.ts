const baseUrl = import.meta.env.PROD
  ? 'https://api.rafaelfranco.com'
  : 'http://localhost:3000'

export const rest = (uri: string, init: RequestInit) =>
  fetch(`${baseUrl}${uri}`, init)
