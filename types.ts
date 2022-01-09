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

export interface Contributions {
  viewer: Viewer
}

export interface Viewer {
  contributionsCollection: ContributionsCollection
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar
}

export interface ContributionCalendar {
  weeks: Week[]
}

export interface Week {
  contributionDays: ContributionDay[]
}

export interface ContributionDay {
  color: string
}
