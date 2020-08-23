## HLTV API

[![Build Status](https://travis-ci.org/dajk/hltv-api.svg?branch=master)](https://travis-ci.org/dajk/hltv-api)
[![npm](https://img.shields.io/npm/v/hltv-api.svg)](http://npm.im/hltv-api)
[![Codecov](https://img.shields.io/codecov/c/github/dajk/hltv-api.svg?maxAge=2592000)](https://codecov.io/gh/dajk/hltv-api)
[![dependencies Status](https://david-dm.org/dajk/hltv-api/status.svg)](https://david-dm.org/dajk/hltv-api)
[![devDependencies Status](https://david-dm.org/dajk/hltv-api/dev-status.svg)](https://david-dm.org/dajk/hltv-api?type=dev)

This is my experimental project, but also small useful module for node.js which helps you to easy implement data from popular CS:GO website [hltv.org](http://www.hltv.org/).

### Installation

```bash
$ npm install hltv-api
```

### Methods

1. [`getNews`](#news)
2. [`getResults`](#results)
3. [`getMatches`](#all-matches)
4. [`getStatsByMatchId`](#single-match)

> Check all the available methods: https://hltv-api.vercel.app/

#### How to use

###### Simple API example

- Using CommonJS module:

```js
const HLTV = require('hltv-api').default
const express = require('express')
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
  res.json(stats)
})

app.get('/:matchId(*)', async (req, res) => {
  const stats = await HLTV.getMatches(req.params.matchId)
  res.json(stats)
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
```

- Using babel and necessary plugins ([demo app](/demo-app/index.js))

```js
import HLTV from 'hltv-api'
```

##### News

```js
app.get('/', async (req, res) => {
  const news = await HLTV.getNews()
  res.json(news)
}
```

- request

```
http://localhost:3000/
```

- response

```json
[
  {
    "title": "ESL Pro League Season 5 Finals preview",
    "description": "The next big offline event, the ESL Pro League Season 5 Finals, is kicking off tomorrow, May 30, with the round-robin group stage. We have put together a preview where we delve into each of the 12 teams taking part in the $750,000 tournament.",
    "link": "https://www.hltv.org/news/20567/esl-pro-league-season-5-finals-preview",
    "date": "Mon, 29 May 2017 23:27:00 GMT"
  }
]
```

##### Results

```js
app.get('/results', async (req, res) => {
  const results = await HLTV.getResults()
  res.json(results)
})
```

- request

```
http://localhost:3000/results
```

- response

```json
[
  {
    "event": "ECS Season 4 Europe",
    "maps": "trn",
    "team1": {
      "name": "fnatic",
      "crest": "https://static.hltv.org/images/team/logo/4991",
      "result": 13
    },
    "team2": {
      "name": "FaZe",
      "crest": "https://static.hltv.org/images/team/logo/6667",
      "result": 16
    },
    "matchId": "/matches/2316387/fnatic-vs-faze-ecs-season-4-europe"
  }
]
```

##### Matches

###### All Matches

```js
app.get('/matches', async (req, res) => {
  const matches = await getMatches()
  res.json(stats)
})
```

- request

```
http://localhost:3000/matches
```

- response

```json
[
  {
    "id": 2336543,
    "link": "/matches/2336543/yalla-vs-ez5-extremesland-2019-middle-regional-finals",
    "time": "2019-09-27T14:40:00.000Z",
    "event": {
      "name": "eXTREMESLAND 2019 Middle Regional Finals",
      "crest": "https://static.hltv.org/images/eventLogos/4927.png"
    },
    "stars": 0,
    "map": "Inferno",
    "teams": [
      {
        "name": "Yalla",
        "crest": "https://static.hltv.org/images/team/logo/8280"
      },
      {
        "name": "EZ5",
        "crest": "https://static.hltv.org/images/team/logo/10395"
      }
    ]
  }
]
```

###### Single Match

```js
app.get('/:matchId(*)', async (req, res) => {
  const { matchId } = req.params
  const stats = await getMatches(matchId)
  res.json(stats)
})
```

- request

```
http://localhost:3000/matches/2316387/fnatic-vs-faze-ecs-season-4-europe
```

- response

```json
[
  {
    "playerName": "Robin flusha Rönnquist",
    "playerId": "/player/3055/flusha",
    "kills": 19,
    "deaths": 19,
    "plusMinus": 0,
    "adr": 73.7,
    "kast": 62.1,
    "rating": 0.97
  }
]
```
