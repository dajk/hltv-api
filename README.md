## hltv-api

### Installation
`npm install hltv-api --save`

### Methods

#### Get upcoming matches
```
var upcomingMatches = require('hltv-api').getUpcomingMatches;

upcomingMatches.getData(function(games) {
  for(var i; i < games.length; i++) {
    console.log(games[i]);
  }
})
```

#### Get latest news
```
var latestNews = require('hltv-api').getLatestNews;

latestNews.getData(function(news) {
  for(var i; i < news; i++) {
    console.log(news[i]);
  }
})
```
