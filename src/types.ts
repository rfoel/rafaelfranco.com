export interface Issues {
  search: Issue
}

export interface Issue {
  nodes: IssueNode[]
}

export interface IssueNode {
  databaseId: number
  number: number
  title: string
  body: string
  bodyText: string
  createdAt: string
  labels: Labels
  comments: Comments
  reactions: ReactionsNodes
}

export interface ReactionsNodes {
  nodes: ReactionNode[]
}

export type ReactionContent =
  | 'THUMBS_UP'
  | 'THUMBS_DOWN'
  | 'LAUGH'
  | 'HOORAY'
  | 'CONFUSED'
  | 'HEART'
  | 'ROCKET'
  | 'EYES'
export interface ReactionNode {
  databaseId: number
  content: ReactionContent
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

export interface Comments {
  nodes: IssueNodeComment[]
  totalCount: number
}

export interface IssueNodeComment {
  databaseId: number
  author: {
    avatarUrl: string
    login: string
  }
  body: string
  createdAt: string
  reactions: ReactionsNodes
}

export interface Label {
  name: string
  color: string
}

export interface Comment {
  id: number
  author: string
  avatar: string
  body: string
  createdAt: string
  reactions: ReactionsNodes
}

export interface Post {
  id: number
  title: string
  body: string
  bodyText: string
  createdAt: string
  issueNumber: number
  labels: Label[]
  comments: Comment[]
  totalComments: number
  reactions: ReactionsNodes
}

export interface User {
  isLoggedIn: boolean
  login: string
  accessToken: string
}
