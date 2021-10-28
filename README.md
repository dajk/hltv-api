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

app.get('/results/:matchId/stats', async (req, res) => {
  const stats = await HLTV.getStatsByMatchId(req.params.matchId)
  res.json(stats)
})

app.get('/players', async (req, res) => {
  const players = await HLTV.getPlayers()
  res.json(players)
})

app.get('/players/:playerId', async (req, res) => {
  const player = await HLTV.getPlayerById(req.params.playerId)
  res.json(player)
})

app.get('/top-teams', async (req, res) => {
  const teams = await HLTV.getTopTeams()
  res.json(teams)
})

app.get('/teams/:teamId', async (req, res) => {
  const team = await HLTV.getTeamById(req.params.teamId)
  res.json(team)
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
    "time": "2017-05-29T23:27:00.000Z"
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
    "time": "2017-08-29T22:05:00.000Z",
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

##### Match Stats

```js
app.get('/results/:matchId/stats', async (req, res) => {
  const { matchId } = req.params
  const stats = await getStatsByMatchId(matchId)
  res.json(stats)
})
```

- request

```
http://localhost:3000/stats/matches/2316387
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

##### Matches

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

##### All Players

```js
app.get('/players', async (req, res) => {
  const players = await getPlayers()
  res.json(players)
})
```

- request

```
http://localhost:3000/players
```

- response

```json
[
  {
    "id": 11893,
    "link": "/stats/players/11893/zywoo",
    "team": "Vitality",
    "nickname": "ZywOo",
    "slug": "zywoo",
    "mapsPlayed": 886,
    "kd": 1.38,
    "rating": 1.28
  },
  {
    "id": 7998,
    "link": "/stats/players/7998/s1mple",
    "team": "Natus Vincere",
    "nickname": "s1mple",
    "slug": "s1mple",
    "mapsPlayed": 1456,
    "kd": 1.33,
    "rating": 1.25
  }
]
```

##### Single Player

```js
app.get('/players/:playerId', async (req, res) => {
  const { playerId } = req.params
  const player = await getPlayerById(playerId)
  res.json(player)
})
```

- request

```
http://localhost:3000/players/11893
```

- response

```json
{
  "id": 11893,
  "team": "Vitality",
  "image": "https://img-cdn.hltv.org/playerbodyshot/FU6cX0sBXlqI-UGYm_92sq.png?ixlib=java-2.1.0&w=400&s=0f5e9fdb4a183bcfb1b1fa7d88b43f08",
  "nickname": "ZywOo",
  "name": "Mathieu Herbaut",
  "age": 20,
  "rating": 1.33,
  "impact": 1.47,
  "dpr": 0.62,
  "apr": 88.9,
  "kast": 74.9,
  "kpr": 0.85,
  "headshots": 41.4,
  "mapsPlayed": 886
}
```

##### Top Teams

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

```json
[
  {
    "id": 4608,
    "ranking": 1,
    "name": "Natus Vincere",
    "logo": "https://img-cdn.hltv.org/teamlogo/9iMirAi7ArBLNU8p3kqUTZ.svg?ixlib=java-2.1.0&s=4dd8635be16122656093ae9884675d0c",
    "players": [
      {
        "fullname": "Aleksandr 's1mple' Kostyliev",
        "image": "https://img-cdn.hltv.org/playerbodyshot/RGemStZHTfFk8AAjkJrbTR.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=128%2C8%2C447%2C447&w=200&s=a9fce418efc5dfcd8bfa70f67ec271ea",
        "nickname": "s1mple",
        "country": {
          "name": "Ukraine",
          "flag": "https://www.hltv.org/img/static/flags/30x20/UA.gif"
        }
      },
      {
        "fullname": "Denis 'electronic' Sharipov",
        "image": "https://img-cdn.hltv.org/playerbodyshot/UqqPxp5Af1CRRCYFXPpJhW.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=136%2C12%2C443%2C443&w=200&s=9674c56f8ba0de72efed7588f49b40e3",
        "nickname": "electronic",
        "country": {
          "name": "Russia",
          "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
        }
      },
      {
        "fullname": "Kirill 'Boombl4' Mikhailov",
        "image": "https://img-cdn.hltv.org/playerbodyshot/t1__JPaC4rWkPIl5lcvkVv.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=136%2C12%2C439%2C439&w=200&s=83be3d70628f93481687ab6bfee38d36",
        "nickname": "Boombl4",
        "country": {
          "name": "Russia",
          "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
        }
      },
      {
        "fullname": "Ilya 'Perfecto' Zalutskiy",
        "image": "https://img-cdn.hltv.org/playerbodyshot/KbAdA0T_YZAdV1hpQagKXi.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=124%2C8%2C471%2C471&w=200&s=1a9b45f8fd2952778641f221693cac35",
        "nickname": "Perfecto",
        "country": {
          "name": "Russia",
          "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
        }
      },
      {
        "fullname": "Valeriy 'B1T' Vakhovskiy",
        "image": "https://img-cdn.hltv.org/playerbodyshot/lP7HjZ_6JIzrY7y0z3qElA.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=113%2C12%2C482%2C482&w=200&s=c30482a1b8682f1fee8da3bb9103dd38",
        "nickname": "B1T",
        "country": {
          "name": "Ukraine",
          "flag": "https://www.hltv.org/img/static/flags/30x20/UA.gif"
        }
      }
    ]
  },
  {
    "id": 4411,
    "ranking": 2,
    "name": "NIP",
    "logo": "https://img-cdn.hltv.org/teamlogo/-ttGATBV_P_HcZazxNNtIb.png?ixlib=java-2.1.0&w=50&s=ba94f7812d1f47183a83f3f34ab959eb",
    "players": [
      {
        "fullname": "Nicolai 'device' Reedtz",
        "image": "https://img-cdn.hltv.org/playerbodyshot/e-VpY--MZr_3XFDmj8DBd6.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=124%2C12%2C467%2C467&w=200&s=be6cce908948cc957456a583af69c172",
        "nickname": "device",
        "country": {
          "name": "Denmark",
          "flag": "https://www.hltv.org/img/static/flags/30x20/DK.gif"
        }
      },
      {
        "fullname": "Fredrik 'REZ' Sterner",
        "image": "https://img-cdn.hltv.org/playerbodyshot/wo_7u8xDj7_NLVMkFr-_J7.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=140%2C12%2C463%2C463&w=200&s=53884b46f6030f3731907aeb55c84a0c",
        "nickname": "REZ",
        "country": {
          "name": "Sweden",
          "flag": "https://www.hltv.org/img/static/flags/30x20/SE.gif"
        }
      },
      {
        "fullname": "Hampus 'hampus' Poser",
        "image": "https://img-cdn.hltv.org/playerbodyshot/c8Zuac20HpzF0QF8ZP92Rd.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=128%2C12%2C459%2C459&w=200&s=ebd5ec063b40a0bfca45a2c9c5e3422a",
        "nickname": "hampus",
        "country": {
          "name": "Sweden",
          "flag": "https://www.hltv.org/img/static/flags/30x20/SE.gif"
        }
      },
      {
        "fullname": "Nicolas 'Plopski' Gonzalez Zamora",
        "image": "https://img-cdn.hltv.org/playerbodyshot/WtGwESz1y4aPKFwjL5hGjM.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=140%2C12%2C447%2C447&w=200&s=5eaf81a9a487d4b0bdd396e79e86cc87",
        "nickname": "Plopski",
        "country": {
          "name": "Sweden",
          "flag": "https://www.hltv.org/img/static/flags/30x20/SE.gif"
        }
      },
      {
        "fullname": "Linus 'LNZ' Holtäng",
        "image": "https://img-cdn.hltv.org/playerbodyshot/6KG1oWIkHJq97YN7FkgNBG.png?bg=3e4c54&h=200&ixlib=java-2.1.0&rect=124%2C16%2C463%2C463&w=200&s=8950be98b40c1c1ad28bf018a076cf90",
        "nickname": "LNZ",
        "country": {
          "name": "Sweden",
          "flag": "https://www.hltv.org/img/static/flags/30x20/SE.gif"
        }
      }
    ]
  }
]
```

##### Team

```js
app.get('/teams/:teamId', async (req, res) => {
  const { teamId } = req.params
  const team = await getPlayerById(teamId)
  res.json(team)
})
```

- request

```
http://localhost:3000/teams/11893
```

- response

```json
{
  "id": 4608,
  "name": "Natus Vincere",
  "logo": "https://img-cdn.hltv.org/teamlogo/9iMirAi7ArBLNU8p3kqUTZ.svg?ixlib=java-2.1.0&s=4dd8635be16122656093ae9884675d0c",
  "ranking": 1,
  "coach": "Andrey 'B1ad3' Gorodenskiy",
  "averagePlayerAge": 22.2,
  "players": [
    {
      "fullname": "Aleksandr 's1mple' Kostyliev",
      "image": "https://img-cdn.hltv.org/playerbodyshot/RGemStZHTfFk8AAjkJrbTR.png?ixlib=java-2.1.0&w=400&s=59b0a61f6f217bc6c1dd54bd4e0aa837",
      "nickname": "s1mple",
      "country": {
        "name": "Ukraine",
        "flag": "https://www.hltv.org/img/static/flags/30x20/UA.gif"
      }
    },
    {
      "fullname": "Denis 'electronic' Sharipov",
      "image": "https://img-cdn.hltv.org/playerbodyshot/UqqPxp5Af1CRRCYFXPpJhW.png?ixlib=java-2.1.0&w=400&s=9ee911d3dd5d5ebc316263adacd79b7e",
      "nickname": "electronic",
      "country": {
        "name": "Russia",
        "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
      }
    },
    {
      "fullname": "Kirill 'Boombl4' Mikhailov",
      "image": "https://img-cdn.hltv.org/playerbodyshot/t1__JPaC4rWkPIl5lcvkVv.png?ixlib=java-2.1.0&w=400&s=97e0fd88f6d89abdc7e638e5361f5e50",
      "nickname": "Boombl4",
      "country": {
        "name": "Russia",
        "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
      }
    },
    {
      "fullname": "Ilya 'Perfecto' Zalutskiy",
      "image": "https://img-cdn.hltv.org/playerbodyshot/KbAdA0T_YZAdV1hpQagKXi.png?ixlib=java-2.1.0&w=400&s=794ffea1f0dbd1e1c80ee6385578fafa",
      "nickname": "Perfecto",
      "country": {
        "name": "Russia",
        "flag": "https://www.hltv.org/img/static/flags/30x20/RU.gif"
      }
    },
    {
      "fullname": "Valeriy 'B1T' Vakhovskiy",
      "image": "https://img-cdn.hltv.org/playerbodyshot/lP7HjZ_6JIzrY7y0z3qElA.png?ixlib=java-2.1.0&w=400&s=4d3a4704f84bc906683916515700d700",
      "nickname": "B1T",
      "country": {
        "name": "Ukraine",
        "flag": "https://www.hltv.org/img/static/flags/30x20/UA.gif"
      }
    }
  ]
}
```
