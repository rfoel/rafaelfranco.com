import { gql, request } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

const getPosts = async (_: NextApiRequest, res: NextApiResponse) => {
  const query = gql`
    query {
      search(first: 10, query: "repo:rfoel/rfoel.dev label:blog", type: ISSUE) {
        nodes {
          ... on Issue {
            title
            createdAt
          }
        }
      }
    }
  `

  const data = await request(
    'https://api.github.com/graphql',
    query,
    {},
    { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}` },
  )

  res.status(200).json(data.search.nodes)
}

export default getPosts
