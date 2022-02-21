import splitbee from '@splitbee/web'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

import Layout from '../components/Layout'

import '../static/index.css'

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  useEffect(() => {
    splitbee.init()
  }, [])

  return (
    <>
      <Head>
        <title>rfoel.dev</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
