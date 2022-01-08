import { gql, request } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query

  const query = `repo:rfoel/rfoel.dev label:blog "${slug}"`

  const data = await request(
    'https://api.github.com/graphql',
    gql`
      query ($query: String!) {
        search(first: 1, query: $query, type: ISSUE) {
          nodes {
            ... on Issue {
              title
              body
              createdAt
            }
          }
        }
      }
    `,
    { query },
    { Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}` },
  )

  res.status(200).json(data.search.nodes[0])
}

export default getPost
