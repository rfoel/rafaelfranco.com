export interface Issues {
  search: Search
}

export interface Search {
  nodes: SearchNode[]
}

export interface SearchNode {
  title: string
  body: string
  bodyText: string
  createdAt: string
  labels: Labels
}

export interface Labels {
  nodes: LabelsNode[]
}

export interface LabelsNode {
  name: string
  color: string
}

export interface Post {
  title: string
  body: string
  bodyText: string
  createdAt: string
  labels: Label[]
}

export interface Label {
  name: string
  color: string
}
