// eslint-disable-next-line import/no-unresolved
import express from 'express'
import {
  getNews,
  getResults,
  getMatches,
  getHotMatches,
  getAllMatches,
} from '../../dist'

const app = express()

app.get('/', (req, res) => {
  getNews((news: any) => res.json(news))
})

app.get('/results', (req, res) => {
  getResults((results: any) => res.json(results))
})

app.get('/all-matches', (req, res) => {
  getAllMatches((stats: any) => res.json(stats))
})

app.get('/hot-matches', (req, res) => {
  getHotMatches((stats: any) => res.json(stats))
})

app.get('/:matchId(*)', (req, res) => {
  const { matchId } = req.params
  getMatches(matchId, (stats: any) => res.json(stats))
})

const PORT: number = 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port http://localhost:${PORT} ...`)
})
