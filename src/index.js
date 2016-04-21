var request = require('request');
var parseString = require('xml2js').parseString;

var upcomingGames = {
  url: 'http://www.hltv.org/hltv.rss.php'
};

upcomingGames.getUpcoming = function(callback) {
  var gamesAttr = {};
  request({ uri: upcomingGames.url }, function(error, response, body) {
    parseString(body, function(err, result) {
      if (err) throw err;
      
      gamesAttr = {
        'upcomingLength': result.rss.channel[0].item.length,
        'games': {}
      };
      
      for (var i = 0; i < gamesAttr.upcomingLength; i++) {
        var matchObj = {
          team1 : result.rss.channel[0].item[i].title[0].split(' vs ')[0],
          team2 : result.rss.channel[0].item[i].title[0].split(' vs ')[1],
          title : result.rss.channel[0].item[i].title[0],
          link  : result.rss.channel[0].item[i].link[0],
          event : result.rss.channel[0].item[i].description[0],
          date  : result.rss.channel[0].item[i].pubDate[0]
        };
        
        gamesAttr.games[matchObj.link.match(/\/match\/([0-9]+)/, '')[1]] = matchObj;
      }
      
      callback(gamesAttr);
    });
  });
};

module.exports = upcomingGames;
