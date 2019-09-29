import express from 'express'
import * as hltv from '../../dist'

const app = express()

app.get('/', (req, res) => {
  hltv.getNews(news => res.json(news))
})

app.get('/results', (req, res) => {
  hltv.getResults(results => res.json(results))
})

app.get('/all-matches', (req, res) => {
  hltv.getAllMatches(stats => res.json(stats))
})

app.get('/:matchId(*)', (req, res) => {
  const { matchId } = req.params
  hltv.getMatches(matchId, stats => res.json(stats))
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT} ...`)
})
