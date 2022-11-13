export type MatchHalfResult = {
  side: 't' | 'ct'
  rounds: number
}

export type MatchResult = {
  first: MatchHalfResult
  second: MatchHalfResult
  ext?: number
}

export type MatchMapTeam = {
  logo?: string
  name: string
  result: MatchResult
}

export type MatchMap = {
  name: string
  pick: string
  teams: MatchMapTeam[]
}

export type MatchStats = {
  name: string
  nickname: string
  id: number
  kills: number
  deaths: number
  adr: number
  kast: number
  rating: number
}

export type MatchEvent = {
  name: string
  logo: string
}

export type MatchTeam = {
  name: string
  logo: string
  result: number
  players: MatchStats[]
}

export type Match = {
  id: number
  time: string
  event: MatchEvent
  teams: MatchTeam[]
  maps: MatchMap[]
}

export type MatchesEvent = {
  name: string
  logo: string
}

export type MatchesTeam = {
  name: string
  logo: string
}

export type MatchesMatch = {
  id: number
  time: string
  event: MatchesEvent
  stars: number
  maps: string
  teams: MatchesTeam[]
}

export type News = {
  title: string
  description: string
  link: string
  time: string
}

export type PlayerTeam = {
  id: number
  name: string
}

export type Player = {
  id: number
  team: PlayerTeam
  image: string
  nickname: string
  name: string
  age: number | null
  rating: number
  impact: number | null
  dpr: number | null
  adr: number | null
  kast: number | null
  kpr: number
  headshots: number
  mapsPlayed: number | null
}

export type PlayersPlayer = {
  id: number
  team: string
  nickname: string
  slug: string
  mapsPlayed: number
  kd: number
  rating: number
}

export type ResultsEvent = {
  name: string
  logo: string
}

export type ResultsTeam = {
  name: string
  logo: string
  result: number
}

export type ResultsResult = {
  event: ResultsEvent
  maps: string
  time: string
  teams: ResultsTeam[]
  matchId: number
}

export type TeamCountry = {
  name: string
  flag: string
}

export type TeamPlayer = {
  fullname: string
  image: string
  nickname: string
  country?: TeamCountry
}

export type Team = {
  id: number
  name: string
  logo: string
  players: TeamPlayer[]
  coach: string
  ranking: number
  averagePlayerAge: number
}

export type TeamsCountry = {
  name: string
  flag: string
}

export type TeamsPlayer = {
  fullname: string
  image: string
  nickname: string
  country: TeamsCountry
}

export type TeamsTeam = {
  id: number
  ranking: number
  name: string
  logo: string
  players: TeamsPlayer[]
}
