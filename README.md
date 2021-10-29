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
3. [`getMatches`](#matches)
4. [`getMatchById`](#match-stats)
5. [`getTopPlayers`](#top-players)
6. [`getPlayerById`](#player-stats)
7. [`getTopTeams`](#top-teams)
8. [`getTeamById`](#single-team)

> Check all the available methods and responses: https://hltv-api.vercel.app/

### How to use

**Simple API example**

- Using CommonJS module:

```js
const HLTV = require('hltv-api').default
const express = require('express')
const app = express()

app.get('/', async (req, res) => {
  const news = await HLTV.getNews()
  res.json(news)
})

app.listen(3000, () => {
  console.log('Listening on port 3000...')
})
```

- Using babel and necessary plugins ([demo app](/examples/with-babel/))

```js
import HLTV from 'hltv-api'
```

#### **News**

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

https://hltv-api.vercel.app/api/news.json

#### **Results**

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

https://hltv-api.vercel.app/api/results.json

#### **Matches**

```js
app.get('/matches', async (req, res) => {
  const matches = await getMatches()
  res.json(matches)
})
```

- request

```
http://localhost:3000/matches
```

- response

https://hltv-api.vercel.app/api/matches.json

#### **Match Stats**

```js
app.get('/results/:matchId/stats', async (req, res) => {
  const stats = await getMatchById(req.params.matchId)
  res.json(stats)
})
```

- request

```
http://localhost:3000/stats/matches/2316387
```

- response

https://hltv-api.vercel.app/api/match.json

#### **Top Players**

```js
app.get('/players', async (req, res) => {
  const players = await getTopPlayers()
  res.json(players)
})
```

- request

```
http://localhost:3000/players
```

- response

https://hltv-api.vercel.app/api/players.json

#### **Player Stats**

```js
app.get('/players/:playerId', async (req, res) => {
  const player = await getPlayerById(req.params.playerId)
  res.json(player)
})
```

- request

```
http://localhost:3000/players/11893
```

- response

https://hltv-api.vercel.app/api/player.json

#### **Top Teams**

```js
app.get('/top-teams', async (req, res) => {
  const teams = await getTopTeams()
  res.json(teams)
})
```

- request

```
http://localhost:3000/top-teams
```

- response

https://hltv-api.vercel.app/api/teams.json

#### **Single Team**

```js
app.get('/teams/:teamId', async (req, res) => {
  const team = await getPlayerById(req.params.teamId)
  res.json(team)
})
```

- request

```
http://localhost:3000/teams/11893
```

- response

https://hltv-api.vercel.app/api/team.json
