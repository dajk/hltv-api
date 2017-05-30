## HLTV API

[![Build Status](https://travis-ci.org/dajk/hltv-api.svg?branch=master)](https://travis-ci.org/dajk/hltv-api)
[![npm](https://img.shields.io/npm/v/hltv-api.svg)](http://npm.im/hltv-api)
[![Codecov](https://img.shields.io/codecov/c/github/dajk/hltv-api.svg?maxAge=2592000)](https://codecov.io/gh/dajk/hltv-api)
[![dependencies Status](https://david-dm.org/dajk/hltv-api/status.svg)](https://david-dm.org/dajk/hltv-api)
[![devDependencies Status](https://david-dm.org/dajk/hltv-api/dev-status.svg)](https://david-dm.org/dajk/hltv-api?type=dev)


This is my experimental project, but also small useful module for node.js which helps you to easy implement data from popular CS:GO website [hltv.org](http://www.hltv.org/).

## Module is down regarding HLTV updates

After updates on HLTV.org, RSS links are not working anymore. Stay tuned for more...

### Installation

```bash
$ npm install hltv-api
```

### Methods

1. `getLatestNews`
4. `getLatestResults`

#### How to use

- `import` methods we are going to use

```js
import {
  getLatestNews,
  getLatestResults,
} from 'hltv-api';
```

##### Latest News
- request
```js
getLatestNews(news => console.log(news));
```

- response
```json
[{
  "title": "ESL Pro League Season 5 Finals preview",
  "description": "The next big offline event, the ESL Pro League Season 5 Finals, is kicking off tomorrow, May 30, with the round-robin group stage. We have put together a preview where we delve into each of the 12 teams taking part in the $750,000 tournament.",
  "link": "https://www.hltv.org/news/20567/esl-pro-league-season-5-finals-preview",
  "date": "Mon, 29 May 2017 23:27:00 GMT"
}, ]
```

##### Latest Results
- request
```js
getLatestResults(results => console.log(results));
```

- response
```json
[{
  "event": "Farmskins Championship #1",
  "maps": { "0": "Inferno", "1": "Train" },
  "team1": {
    "name": "LDLC",
    "crest": "https://static.hltv.org/images/team/logo/4674",
    "result": { "0": 8, "1": 10 },
    "total": 0
  },
  "team2": {
    "name": "BIG",
    "crest": "https://static.hltv.org/images/team/logo/7532",
    "result": { "0": 16, "1": 16 },
    "total": 2
  },
  "matchId": "/matches/2311152/ldlc-vs-big-farmskins-championship-1"
}, ]
```
