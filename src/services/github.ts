import { Octokit } from '@octokit/core'
import type { Endpoints, OctokitResponse } from '@octokit/types'

import type { Issues, SummaryIssues } from '../types'

let blogOctokit: Octokit
let userOctokit: Octokit

const domain =
  process.env.STAGE === 'prod'
    ? `https://${process.env.DOMAIN_NAME}`
    : 'http://localhost:3000'

export const getOAuthUrl = (): string =>
  `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${domain}/blog/oauth`

export const authenticate = async (
  code: string,
): Promise<{ accessToken: string; login: string }> => {
  const { access_token } = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
      }),
    },
  ).then((response) => response.json())

  const { login } = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  return { accessToken: access_token, login }
}

const initBlogOctokit = () => {
  if (blogOctokit) return
  blogOctokit = new Octokit({ auth: process.env.PERSONAL_ACCESS_TOKEN })
}

const initUserOctokit = (accessToken: string) => {
  if (userOctokit) return
  userOctokit = new Octokit({ auth: accessToken })
}

export const searchIssues = async (): Promise<SummaryIssues> => {
  initBlogOctokit()
  const query = `
    query {
      search(
        first: 10
        query: "repo:rfoel/rfoel.dev is:open label:blog"
        type: ISSUE
      ) {
        nodes {
          ... on Issue {
            bodyText
            createdAt
            title
          }
        }
      }
    }
  `

  return blogOctokit.graphql<SummaryIssues>(query)
}

export const searchIssue = async (slug: string): Promise<Issues> => {
  initBlogOctokit()
  const query = `
    query ($queryString: String!) {
      search(first: 1, query: $queryString, type: ISSUE) {
        nodes {
          ... on Issue {
            databaseId
            title
            body
            createdAt
            bodyText
            number
            labels(first: 5) {
              nodes {
                name
                color
              }
            }
            comments(
              first: 10
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              nodes {
                author {
                  avatarUrl
                  login
                }
                databaseId
                body
                createdAt
                reactions(first: 100) {
                  nodes {
                    databaseId
                    content
                    user {
                      login
                    }
                  }
                }
              }
              totalCount
            }
            reactions(first: 100) {
              nodes {
                databaseId
                content
                user {
                  login
                }
              }
            }
          }
        }
      }
    }
  `

  return blogOctokit.graphql<Issues>(query, {
    queryString: `repo:rfoel/rfoel.dev label:blog "${slug}"`,
  })
}

export const addReactionForIssue = async ({
  accessToken,
  content,
  issueNumber,
}: {
  accessToken: string
  commentId: number
  issueNumber: number
  content: Endpoints['POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['parameters']['content']
}): Promise<
  OctokitResponse<
    Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/reactions']['response']['data']
  >
> => {
  initUserOctokit(accessToken)
  return userOctokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/reactions',
    {
      owner: 'rfoel',
      repo: 'rfoel.dev',
      content,

      issue_number: issueNumber,
    },
  )
}

export const addReactionForComment = async ({
  accessToken,
  content,
  commentId,
}: {
  accessToken: string
  commentId: number
  issueNumber: number
  content: Endpoints['POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['parameters']['content']
}): Promise<
  OctokitResponse<
    Endpoints['POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['response']['data']
  >
> => {
  initUserOctokit(accessToken)
  return userOctokit.request(
    'POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions',
    {
      owner: 'rfoel',
      repo: 'rfoel.dev',
      content,
      comment_id: commentId,
    },
  )
}

export const deleteReactionForIssue = (params: {
  accessToken: string
  issueNumber: number
  reactionId: number
}): Promise<
  OctokitResponse<
    Endpoints['DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}']['response']['data']
  >
> => {
  initUserOctokit(params.accessToken)

  return userOctokit.request(
    'DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}',
    {
      owner: 'rfoel',
      repo: 'rfoel.dev',
      issue_number: params.issueNumber,
      reaction_id: params.reactionId,
    },
  )
}

export const deleteReactionForComment = (params: {
  accessToken: string
  commentId: number
  reactionId: number
}): Promise<
  OctokitResponse<
    Endpoints['DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}']['response']['data']
  >
> => {
  initUserOctokit(params.accessToken)
  return userOctokit.request(
    'DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}',
    {
      owner: 'rfoel',
      repo: 'rfoel.dev',
      comment_id: params.commentId,
      reaction_id: params.reactionId,
    },
  )
}

export const comment = async ({
  accessToken,
  body,
  issueNumber,
}: {
  accessToken: string
  body: string
  issueNumber: number
}): Promise<
  OctokitResponse<
    Endpoints['POST /repos/{owner}/{repo}/issues/{issue_number}/comments']['response']['data']
  >
> => {
  initUserOctokit(accessToken)
  return userOctokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: 'rfoel',
      repo: 'rfoel.dev',
      issue_number: issueNumber,
      body,
    },
  )
}
