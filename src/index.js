import request from 'request';
import { parseString } from 'xml2js';

class HLTV {
  constructor(type) {
    this.type = type;
  }

  getData(callback) {
    const uri = `http://www.hltv.org/${this.type}.rss.php`;
    let attr = {};

    request({ uri }, (error, response, body) => {
      parseString(body, (err, result) => {
        attr = {
          callbackLength: result.rss.channel[0].item.length
        };

        attr[this.type] = [];

        for (let i = 0; i < attr.callbackLength; i++) {
          const obj = {
            title       : result.rss.channel[0].item[i].title[0],
            link        : result.rss.channel[0].item[i].link[0],
            date        : result.rss.channel[0].item[i].pubDate[0],
            description : result.rss.channel[0].item[i].description ? result.rss.channel[0].item[i].description[0] : null,
            map         : result.rss.channel[0].item[i].map ? result.rss.channel[0].item[i].map[0] : null
          };

          // Delete non-existent properties
          for (let key in obj) {
            if (!obj[key]) delete(obj[key]);
          }

          attr[this.type].push(obj);
        }

        callback(attr, err);
      });
    });
  }
}

export default {
  getLatestNews: new HLTV('news'),
  getLatestBlogs: new HLTV('blog'),
  getLatestDemos: new HLTV('demo')
};
