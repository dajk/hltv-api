import express from 'express'
import HLTV from '../../dist/index.js'

const app = express()

app.get('/', async (_req, res) => {
  const news = await HLTV.getNews()
  res.json(news)
})

app.get('/results', async (_req, res) => {
  const results = await HLTV.getResults()
  res.json(results)
})

app.get('/results/:matchId/stats', async (req, res) => {
  const { matchId } = req.params
  const match = await HLTV.getMatchById(Number(matchId))
  res.json(match)
})

app.get('/matches', async (_req, res) => {
  const matches = await HLTV.getMatches()
  res.json(matches)
})

app.get('/players', async (_req, res) => {
  const players = await HLTV.getTopPlayers()
  res.json(players)
})

app.get('/players/:playerId', async (req, res) => {
  const { playerId } = req.params
  const player = await HLTV.getPlayerById(Number(playerId))
  res.json(player)
})

const PORT: number = 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT} ...`)
})
