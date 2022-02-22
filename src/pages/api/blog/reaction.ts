import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as github from '../../../services/github'
import { sessionOptions } from '../../../utils/session'

const reaction = withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const body = JSON.parse(req.body)
    if (req.method === 'POST') {
      const promise = body.issueNumber
        ? github.addReactionForIssue({
            accessToken: req.session.user?.accessToken,
            ...body,
          })
        : github.addReactionForComment({
            accessToken: req.session.user?.accessToken,
            ...body,
          })
      const response = await promise

      res.status(response.status).send(response.data)
    } else if (req.method === 'DELETE') {
      const promise = body.issueNumber
        ? github.deleteReactionForIssue({
            accessToken: req.session.user?.accessToken,
            ...body,
          })
        : github.deleteReactionForComment({
            accessToken: req.session.user?.accessToken,
            ...body,
          })
      const response = await promise
      res.status(response.status).send(response.data)
    }
  },
  sessionOptions,
)

export default reaction
