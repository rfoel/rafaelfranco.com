import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as github from '../../../services/github'
import { sessionOptions } from '../../../utils/session'

const reaction = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === 'POST') {
      const response = await github.addReaction({
        accessToken: req.session.user?.accessToken,
        ...JSON.parse(req.body),
      })
      res.status(response.status).send('')
    } else if (req.method === 'DELETE') {
      const response = await github.deleteReaction({
        accessToken: req.session.user?.accessToken,
        ...JSON.parse(req.body),
      })
      res.status(response.status).send('')
    }
  },
  sessionOptions,
)

export default reaction
