import express from 'express';
import { getNews, getResults, getMatchOverview } from '../src/index';

const app = express();

app.get('/', (req, res) => {
  getNews(news => res.json(news));
});

app.get('/results', (req, res) => {
  getResults(results => res.json(results));
});

app.get('/match-overview/:id*', (req, res) => {
  const id = req.params.id + req.params[0];
  getMatchOverview(id, (stats) => res.json(stats));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});
