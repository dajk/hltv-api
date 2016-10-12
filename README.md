## HLTV API

[![Build Status](https://travis-ci.org/dajk/hltv-api.svg?branch=master)](https://travis-ci.org/dajk/hltv-api)
[![dependencies Status](https://david-dm.org/dajk/hltv-api/status.svg)](https://david-dm.org/dajk/hltv-api)
[![devDependencies Status](https://david-dm.org/dajk/hltv-api/dev-status.svg)](https://david-dm.org/dajk/hltv-api?type=dev)

This is small module for node.js. It's created for easier implementation data from available RSS links from [hltv.org](http://www.hltv.org/)

### Installation
`npm install hltv-api`

### Methods

`getLatestNews`, `getLatestBlogs`, `getLatestDemos`

##### Breaking methods (HLTV doesn't support these two anymore): `getUpcomingMatches`, `getHotMatches`

#### Get upcoming matches example
```
var latestNews = require('hltv-api').getLatestNews;

latestNews.getData(function(news) {
  console.dir(news);
});
```

Request looks the same for all methods...
