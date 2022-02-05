import type { NextApiRequest, NextApiResponse } from 'next'

import { searchIssue } from '../../../services/github'

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query

  const post = await searchIssue(slug as string)

  res.status(200).json(post)
}

export default getPost
