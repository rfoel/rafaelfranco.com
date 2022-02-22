import type { NextApiRequest, NextApiResponse } from 'next'

import { searchIssues } from '../../../services/github'

const getPosts = async (
  _: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const posts = await searchIssues()

  res.status(200).json(posts)
}

export default getPosts
