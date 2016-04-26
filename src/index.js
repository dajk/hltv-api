var request = require('request');
var parseString = require('xml2js').parseString;

function HLTV(type) {
  this.type = type;
}

HLTV.prototype.getUrl = function() {
  return 'http://www.hltv.org/' + this.type + '.rss.php';
};

HLTV.prototype.getData = function(callback) {
  var self = this;
  var attr = {};
  request({ uri: this.getUrl() }, function(error, response, body) {
    parseString(body, function(err, result) {
      if (err) throw err;
      
      attr = {
        'callbackLength': result.rss.channel[0].item.length,
      };
      
      attr[self.type] = {};
      
      for (var i = 0; i < attr.callbackLength; i++) {
        var obj = {
          title : result.rss.channel[0].item[i].title[0],
          link  : result.rss.channel[0].item[i].link[0],
          description : result.rss.channel[0].item[i].description ? result.rss.channel[0].item[i].description[0] : null,
          date  : result.rss.channel[0].item[i].pubDate[0]
        };
        
        attr[self.type][i] = obj;
      }
      
      callback(attr);
    });
  });
}

module.exports = {
  getUpcomingMatches: new HLTV('hltv'),
  getLatestNews: new HLTV('news')
};
