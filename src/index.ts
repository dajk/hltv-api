import { getMatches, getStatsByMatchId } from './matches'
import { getResults } from './results'
import getRSS from './rss'

export default {
  getNews: async () => getRSS('news'),
  getResults,
  getStatsByMatchId,
  getMatches,
}
