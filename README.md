## HLTV API

[![Build Status](https://semaphoreci.com/api/v1/dajk/hltv-api/branches/master/badge.svg)](https://semaphoreci.com/dajk/hltv-api)

This is small module for node.js. It's created for easier implementation data from available RSS links from [hltv.org](http://www.hltv.org/)

### Installation
`npm install hltv-api`

### Methods

`upcomingMatches`, `getHotMatches`, `getLatestNews`, `getLatestBlogs`, `getLatestDemos`

#### Get upcoming matches example
```
var upcomingMatches = require('hltv-api').getUpcomingMatches;

upcomingMatches.getData(function(games) {
  console.dir(games);
});
```

Request looks the same for all methods...
