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

// old
// export interface Issues {
//   search: Issue
// }

// export interface Issue {
//   nodes: IssueNode[]
// }

// export interface IssueNode {
//   databaseId: number
//   number: number
//   title: string
//   body: string
//   bodyText: string
//   createdAt: string
//   labels: Labels
//   comments: Comments
//   reactions: ReactionsNodes
// }

// export interface ReactionsNodes {
//   nodes: ReactionNode[]
// }

// export type ReactionContent =
//   | 'THUMBS_UP'
//   | 'THUMBS_DOWN'
//   | 'LAUGH'
//   | 'HOORAY'
//   | 'CONFUSED'
//   | 'HEART'
//   | 'ROCKET'
//   | 'EYES'
// export interface ReactionNode {
//   databaseId: number
//   content: ReactionContent
//   user: {
//     login: string
//   }
// }
// export interface Labels {
//   nodes: LabelsNode[]
// }

// export interface LabelsNode {
//   name: string
//   color: string
// }

// export interface Comments {
//   nodes: IssueNodeComment[]
//   totalCount: number
// }

// export interface IssueNodeComment {
//   databaseId: number
//   author: {
//     avatarUrl: string
//     login: string
//   }
//   body: string
//   createdAt: string
//   reactions: ReactionsNodes
// }

// export interface Label {
//   name: string
//   color: string
// }

// export interface Comment {
//   id: number
//   author: string
//   avatar: string
//   body: string
//   createdAt: string
//   reactions: ReactionsNodes
// }

// export interface Post {
//   id: number
//   title: string
//   body: string
//   bodyText: string
//   createdAt: string
//   issueNumber: number
//   labels: Label[]
//   comments: Comment[]
//   totalComments: number
//   reactions: ReactionsNodes
// }

export interface User {
  isLoggedIn: boolean
  login: string
  accessToken: string
}
