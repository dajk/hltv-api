const fs = require('fs')
const HLTV = require('../dist/index.js').default

const requests = [
  HLTV.getNews(),
  HLTV.getResults(),
  HLTV.getMatches(undefined, true),
  HLTV.getMatches(6586),
  HLTV.getMatchById(2352470),
  HLTV.getLiveMatchById(2359827),
  HLTV.getTopPlayers(),
  HLTV.getPlayerById(11893),
  HLTV.getTopTeams(),
  HLTV.getTeamById(4608),
]
Promise.all(requests).then(
  ([news, results, matches, matchesByEvent, match, liveMatch, players, player, teams, team]) => {
    const base = `public/api`
    fs.writeFileSync(`${base}/news.json`, `${JSON.stringify(news, null, 2)}\n`)
    fs.writeFileSync(`${base}/results.json`, `${JSON.stringify(results, null, 2)}\n`)
    fs.writeFileSync(`${base}/matches.json`, `${JSON.stringify(matches, null, 2)}\n`)
    fs.writeFileSync(`${base}/matchesByEvent.json`, `${JSON.stringify(matchesByEvent, null, 2)}\n`)
    fs.writeFileSync(`${base}/match.json`, `${JSON.stringify(match, null, 2)}\n`)
    fs.writeFileSync(`${base}/liveMatch.json`, `${JSON.stringify(liveMatch, null, 2)}\n`)
    fs.writeFileSync(`${base}/players.json`, `${JSON.stringify(players, null, 2)}\n`)
    fs.writeFileSync(`${base}/player.json`, `${JSON.stringify(player, null, 2)}\n`)
    fs.writeFileSync(`${base}/teams.json`, `${JSON.stringify(teams, null, 2)}\n`)
    fs.writeFileSync(`${base}/team.json`, `${JSON.stringify(team, null, 2)}\n`)
  }
)
