import express from 'express';
import { getNews, getResults } from 'hltv-api';

const app = express();

app.get('/', (req, res) => {
  getNews(news => res.json(news));
});

app.get('/results', (req, res) => {
  getResults(results => res.json(results));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});
