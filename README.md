## HLTV API

This is small module for node.js. It's created for easier implementation data from available RSS links from [hltv.org](http://www.hltv.org/)

### Installation
`npm install hltv-api`

### Methods

`getUpcomingMatches`, `getHotMatches`, `getLatestNews`, `getLatestBlogs`, `getLatestDemos`

#### Get upcoming matches example
```
var upcomingMatches = require('hltv-api').getUpcomingMatches;

upcomingMatches.getData(function(games) {
  console.dir(games);
});
```

Request looks the same for all methods...
