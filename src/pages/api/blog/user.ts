import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'

import { User } from '../../../types'
import { sessionOptions } from '../../../utils/session'

const userRoute = (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      login: '',
      accessToken: '',
    })
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions)
