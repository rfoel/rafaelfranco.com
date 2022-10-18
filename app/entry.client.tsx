import { CacheProvider } from '@emotion/react'
import { RemixBrowser } from '@remix-run/react'
import splitbee from '@splitbee/web'
import React, { useEffect, useState } from 'react'
import { hydrateRoot } from 'react-dom/client'

import { ClientStyleContext } from './context'
import createEmotionCache from './createEmotionCache'

interface ClientCacheProviderProps {
  children: React.ReactNode
}

const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = useState(createEmotionCache())

  const reset = () => {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

const Client = () => {
  useEffect(() => {
    splitbee.init()
  }, [])

  return <RemixBrowser />
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <Client />
  </ClientCacheProvider>,
)
