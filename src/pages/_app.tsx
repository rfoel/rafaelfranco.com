import splitbee from '@splitbee/web'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

import Layout from '../components/Layout'

import '../static/index.css'

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    splitbee.init({
      scriptUrl: '/bee.js',
      apiUrl: '/_hive',
    })
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
