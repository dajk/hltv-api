import UserAgent from 'user-agents'

export const CONFIG = {
  BASE: 'https://www.hltv.org',
  CDN: 'https://img-cdn.hltv.org',
  RSS: 'rss',
  RESULTS: 'results',
  MATCHES: 'matches',
  PLAYERS: 'stats/players',
  TEAMS: 'ranking/teams',
  TEAM: 'team',
}

export const MAPS = {
  trn: 'Train',
  mrg: 'Mirage',
  d2: 'Dust 2',
  inf: 'Inferno',
  vtg: 'Vertigo',
  ovp: 'Overpass',
  nuke: 'Nuke',
}

export const USER_AGENT = new UserAgent().toString()
