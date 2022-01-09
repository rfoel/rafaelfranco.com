import { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/Layout'

import '../static/index.css'
import '../static/dracula.css'

const App = ({ Component, pageProps }: AppProps) => {
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
