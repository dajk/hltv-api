interface maps {
  [key: string]: string
  trn: string
  mrg: string
  d2: string
  inf: string
  vtg: string
  ovp: string
  nuke: string
}

export const CONFIG = {
  BASE: 'https://www.hltv.org',
  STATIC: 'https://static.hltv.org',
  RSS: '/rss',
  RESULTS: '/results',
  MATCHES: '/matches',
}

export const MAPS: maps = {
  trn: 'Train',
  mrg: 'Mirage',
  d2: 'Dust 2',
  inf: 'Inferno',
  vtg: 'Vertigo',
  ovp: 'Overpass',
  nuke: 'Nuke',
}
