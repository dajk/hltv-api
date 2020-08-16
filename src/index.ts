import Results from './results'
import RSS from './rss'
import Matches from './matches'

export const getNews = (cb: (response: any) => void) => new RSS('news', cb)
export const getResults = (cb: (response: any) => void) => new Results(cb)
export const getMatches = (id: string, cb: (response: any) => void) =>
  new Matches(cb).getSingleMatch(id)
export const getAllMatches = (cb: (response: any) => void) =>
  new Matches(cb).getAllMatches()
