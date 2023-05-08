import { getMatchById } from './match'
import { getMatches } from './matches'
import { getLiveMatchById } from './liveMatch'
import { getResults } from './results'
import { getTopPlayers } from './players'
import { getPlayerById, getPlayersByName } from './player'
import { getTopTeams } from './teams'
import { getTeamById } from './team'
import getRSS from './rss'

export default {
  getNews: async () => getRSS('news'),
  getResults,
  getMatchById,
  getMatches,
  getLiveMatchById,
  getTopPlayers,
  getPlayerById,
  getPlayersByName,
  getTopTeams,
  getTeamById,
}
