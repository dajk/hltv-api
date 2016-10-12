var request = require('request');
var parseString = require('xml2js').parseString;

function HLTV(type) {
  this.type = type;
}

HLTV.prototype.getData = function(callback) {
  var self = this;
  var url = 'http://www.hltv.org/' + this.type + '.rss.php';
  var attr = {};

  request({ uri: url }, function(error, response, body) {
    parseString(body, function(err, result) {
      attr = {
        'callbackLength': result.rss.channel[0].item.length,
      };
      
      attr[self.type] = [];
      
      for (var i = 0; i < attr.callbackLength; i++) {
        var obj = {
          title : result.rss.channel[0].item[i].title[0],
          link  : result.rss.channel[0].item[i].link[0],
          date  : result.rss.channel[0].item[i].pubDate[0],
          description : result.rss.channel[0].item[i].description ? result.rss.channel[0].item[i].description[0] : null,
          map : result.rss.channel[0].item[i].map ? result.rss.channel[0].item[i].map[0] : null
        };

        // Delete non-existent properties
        for (var key in obj) {
          if (!obj[key]) delete(obj[key]);
        }

        attr[self.type].push(obj);
      }
      
      callback(attr, err);
    });
  });
}

module.exports = {
  getLatestNews: new HLTV('news'),
  getLatestBlogs: new HLTV('blog'),
  getLatestDemos: new HLTV('demo')
};
