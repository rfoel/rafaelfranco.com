import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import { comment } from '../../../services/github'
import { sessionOptions } from '../../../utils/session'

const postComment = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const body = JSON.parse(req.body)
    const response = await comment({
      accessToken: req.session.user?.accessToken,
      ...body,
    })
    res.status(response.status).send('')
  },
  sessionOptions,
)

export default postComment
