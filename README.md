## HLTV API

[![Build Status](https://travis-ci.org/dajk/hltv-api.svg?branch=master)](https://travis-ci.org/dajk/hltv-api)
[![npm](https://img.shields.io/npm/v/hltv-api.svg?maxAge=2592000)](http://npm.im/hltv-api)
[![Codecov](https://img.shields.io/codecov/c/github/dajk/hltv-api.svg?maxAge=2592000)](https://codecov.io/gh/dajk/hltv-api)
[![dependencies Status](https://david-dm.org/dajk/hltv-api/status.svg)](https://david-dm.org/dajk/hltv-api)
[![devDependencies Status](https://david-dm.org/dajk/hltv-api/dev-status.svg)](https://david-dm.org/dajk/hltv-api?type=dev)


This is my experimental project, but also small useful module for node.js which helps you to easy implement data from popular CS:GO website [hltv.org](http://www.hltv.org/).

### Installation

```bash
$ npm install hltv-api
```

### Methods

1. `getLatestNews`
2. `getLatestBlogs`
3. `getLatestDemos`
4. `getLatestResults`

#### How to use

- `import` methods we are going to use

```js
import {
  getLatestNews,
  getLatestBlogs,
  getLatestDemos,
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
{
  "callbackLength": 10,
  "news": [{
    "title": "G2 acquire Spanish roster",
    "link": "http://www.hltv.org/news/20252-g2-acquire-spanish-roster",
    "date": "Mon, 17 Apr 2017 16:55:00 +0200"
  }, {
    "title": "kennyS & shox to HTC 2v2",
    "link": "http://www.hltv.org/news/20251-kennys-shox-to-htc-2v2",
    "date": "Sun, 16 Apr 2017 22:10:00 +0200"
  }, ]
}
```

##### Latest Blogs
- request
```js
getLatestBlogs(blogs => console.log(blogs));
```

- response
```json
{
  "callbackLength": 10,
  "blog": [{
    "title": "kaeschdle: BIG - What's the problem?",
    "link": "http://www.hltv.org/?pageid=18&ref=frontpageBox&threadid=1454079",
    "date": "Sun, 16 Apr 2017 13:40:52 +0200"
  }, {
    "title": "RossHolloway: FlipSid3 - phenomenom of competitive CS:GO",
    "link": "http://www.hltv.org/?pageid=18&ref=frontpageBox&threadid=1453886",
    "date": "Sun, 16 Apr 2017 00:14:22 +0200"
  }, ]
}
```

##### Latest Demos
- request
```js
getLatestDemos(demos => console.log(demos));
```

- response
```json
{
  "callbackLength": 10,
  "blog": [{
    "title": "London Conspiracy fe vs Secret fe",
    "link": "http://www.hltv.org?pageid=28&demoid=27638",
    "date": "Sun, 16 Apr 2017 01:49:16 +0200",
    "description": "Copenhagen Games 2017 Female",
    "map": "Best of 3"
  }, {
    "title": "Secret fe vs Red Reserve fe",
    "link": "http://www.hltv.org?pageid=28&demoid=27637",
    "date": "Sun, 16 Apr 2017 01:48:59 +0200",
    "description": "Copenhagen Games 2017 Female",
    "map": "Best of 3"
  }, ]
}
```


##### Latest Results
- request
```js
getLatestResults(results => console.log(results));
```

- response
```json
{
  "callbackLength": 50,
  "blog": [{
    "matchMap": "Best of 3",
    "homeTeam": "Tricked",
    "homeTeamCrest": "http://static.hltv.org/images/team/logo/4602",
    "homeTeamScore": 2,
    "awayTeamScore": 0,
    "awayTeam": "NRG",
    "awayTeamCrest": "http://static.hltv.org/images/team/logo/6673",
    "matchid": "2309787-tricked-nrg-copenhagen-games-2017"
  }, {
    "matchMap": "Best of 3",
    "homeTeam": "dreamchasers",
    "homeTeamCrest": "http://static.hltv.org/images/team/logo/7378",
    "homeTeamScore": 2,
    "awayTeamScore": 0,
    "awayTeam": "North Academy",
    "awayTeamCrest": "http://static.hltv.org/images/team/logo/7713",
    "matchid": "2309788-dreamchasers-north-academy-copenhagen-games-2017"
  }, ]
}
```
