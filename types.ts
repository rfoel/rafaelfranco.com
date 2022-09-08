export interface SummaryIssues {
  data: SummaryIssuesData
}

export interface SummaryIssuesData {
  search: SummaryIssuesSearch
}

export interface SummaryIssuesSearch {
  nodes: SummaryIssuesNode[]
}

export interface SummaryIssuesNode {
  bodyText: string
  createdAt: Date
  title: string
}

export interface Issues {
  data: IssuesData
}

export interface IssuesData {
  search: IssuesSearch
}

export interface IssuesSearch {
  nodes: IssuesSearchNode[]
}

export interface IssuesSearchNode {
  databaseId: number
  title: string
  body: string
  createdAt: Date
  bodyText: string
  number: number
  labels: Labels
  comments: Comments
  reactions: Reactions
}

export interface Comments {
  nodes: CommentsNode[]
  totalCount: number
}

export interface CommentsNode {
  author: Author
  databaseId: number
  body: string
  createdAt: Date
  reactions: Reactions
}

export interface Author {
  avatarUrl: string
  login: string
}

export interface Reactions {
  nodes: ReactionsNode[]
}

export interface ReactionsNode {
  databaseId: number
  content:
    | 'THUMBS_UP'
    | 'THUMBS_DOWN'
    | 'LAUGH'
    | 'HOORAY'
    | 'CONFUSED'
    | 'HEART'
    | 'ROCKET'
    | 'EYES'
  user: {
    login: string
  }
}

export interface Labels {
  nodes: LabelsNode[]
}

export interface LabelsNode {
  name: string
  color: string
}

export interface User {
  isLoggedIn: boolean
  login: string
  accessToken: string
}
