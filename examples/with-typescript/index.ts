import express from 'express'
import HLTV from '../../dist'

const app = express()

app.get('/', async (req, res) => {
  const news = await HLTV.getNews()
  res.json(news)
})

app.get('/results', async (req, res) => {
  const results = await HLTV.getResults()
  res.json(results)
})

app.get('/matches', async (req, res) => {
  const matches = await HLTV.getMatches()
  res.json(matches)
})

app.get('/:matchId(*)', async (req, res) => {
  const { matchId } = req.params
  const stats = await HLTV.getStatsByMatchId(matchId)
  res.json(stats)
})

const PORT: number = 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT} ...`)
})
