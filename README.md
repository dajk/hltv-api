## hltv-api

### Installation
`npm install hltv-api --save`

### Methods

#### Get upcoming matches
```
var upcomingMatches = require('hltv-api').getUpcomingMatches;

upcomingMatches.getData(function(games) {
  console.log(games);
})
```

#### Get latest news
```
var latestNews = require('hltv-api').getLatestNews;

latestNews.getData(function(news) {
  console.log(news);
})
```
