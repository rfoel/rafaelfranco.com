import type { NextApiRequest, NextApiResponse } from 'next'

import { getContributionDays } from '../../services/github'

const getContributions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { from, to } = req.query
  const contributionDays = await getContributionDays(
    from as string,
    to as string,
  )

  res.status(200).json(contributionDays)
}

export default getContributions
