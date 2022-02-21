import splitbee from '@splitbee/web'
import { withIronSessionSsr } from 'iron-session/next'
import { GetServerSideProps } from 'next'
import { useEffect } from 'react'

import { authenticate } from '../../services/github'
import { User } from '../../types'
import { sessionOptions } from '../../utils/session'

const OAuth: React.FC = () => {
  useEffect(() => {
    window.close()
  }, [])

  return <></>
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, query }) => {
    const { code } = query

    if (typeof code === 'string') {
      const auth = await authenticate(code)
      const user = { isLoggedIn: true, ...auth } as User
      req.session.user = user
      await req.session.save()
      await splitbee.user.set({ ...user })
    }

    return { props: {} }
  },
  sessionOptions,
)

export default OAuth
