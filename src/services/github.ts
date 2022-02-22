import { Octokit } from '@octokit/core'
import type { Endpoints, OctokitResponse } from '@octokit/types'
import { gql } from 'graphql-request'

import type { Issues, Post } from '../types'

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

export const searchIssues = async (): Promise<Post[]> => {
  initBlogOctokit()

  const query = gql`
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

  const data = await blogOctokit.graphql<Issues>(query)

  return data.search.nodes as unknown as Post[]
}

export const searchIssue = async (slug: string): Promise<Post> => {
  initBlogOctokit()
  const query = gql`
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

  const data = await blogOctokit.graphql<Issues>(query, {
    queryString: `repo:rfoel/rfoel.dev label:blog "${slug}"`,
  })

  const post = data.search.nodes[0] as unknown as Post
  post.id = data.search.nodes[0].databaseId
  post.issueNumber = data.search.nodes[0].number
  post.labels = data.search.nodes[0].labels.nodes.filter(
    ({ name }) => name !== 'blog',
  )
  post.totalComments = data.search.nodes[0].comments.totalCount
  post.comments = data.search.nodes[0].comments.nodes.map(
    ({ databaseId, author, body, createdAt, reactions }) => ({
      id: databaseId,
      author: author.login,
      avatar: author.avatarUrl,
      body,
      createdAt,
      reactions,
    }),
  )

  return post
}

export const addReaction = async ({
  accessToken,
  content,
  commentId,
  issueNumber,
}: {
  accessToken: string
  commentId: number
  issueNumber: number
  content: Endpoints['POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions']['parameters']['content']
}): Promise<OctokitResponse<unknown>> => {
  initUserOctokit(accessToken)
  if (issueNumber) {
    return userOctokit.request(
      'POST /repos/{owner}/{repo}/issues/{issue_number}/reactions',
      {
        owner: 'rfoel',
        repo: 'rfoel.dev',
        content,

        issue_number: issueNumber,
      },
    )
  } else {
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
}

export const deleteReaction = async ({
  accessToken,
  commentId,
  issueNumber,
  reactionId,
}: {
  accessToken: string
  commentId: number
  issueNumber: number
  reactionId: number
}): Promise<OctokitResponse<unknown>> => {
  initUserOctokit(accessToken)
  if (issueNumber) {
    return userOctokit.request(
      'DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}',
      {
        owner: 'rfoel',
        repo: 'rfoel.dev',
        issue_number: issueNumber,
        reaction_id: reactionId,
      },
    )
  } else {
    return userOctokit.request(
      'DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}',
      {
        owner: 'rfoel',
        repo: 'rfoel.dev',
        comment_id: commentId,
        reaction_id: reactionId,
      },
    )
  }
}

export const comment = async ({
  accessToken,
  body,
  issueNumber,
}: {
  accessToken: string
  body: string
  issueNumber: number
}): Promise<OctokitResponse<unknown>> => {
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
