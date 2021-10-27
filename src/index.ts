import { getStatsByMatchId } from './match-stats'
import { getMatches } from './matches'
import { getResults } from './results'
import { getPlayers } from './players'
import { getPlayerById } from './player'
import getRSS from './rss'

export default {
  getNews: async () => getRSS('news'),
  getResults,
  getStatsByMatchId,
  getMatches,
  getPlayers,
  getPlayerById,
}
