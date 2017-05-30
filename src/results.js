import request from 'request';
import cheerio from 'cheerio';
import { CONFIG } from './config';

/**
 * Scraping results
 * 
 * @export
 * @class Results
 */
export default class Results {

  /**
   * Creates an instance of Results.
   * 
   * @param {any} callback 
   * 
   * @memberOf Results
   */
  constructor(callback) {
    const uri = `${CONFIG.BASE}${CONFIG.RESULTS}`;

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body);

      const resultElements = $('.results-all .result-con');

      let results = [];

      $(resultElements).each((i, element) => {
        const header = $(element).find('tr.header');
        const team1 = header.next();
        const team2 = header.next().next();
        const matchId = $(element).children('a').attr('href');

        let maps = {};
        const playedMaps = header.find('.map');
        playedMaps.each((i, map) => {
          maps[i] = $(map).text();
        });

        let result1 = {};
        const result1Maps = team1.find('.mapscore');
        result1Maps.each((i, res) => {
          result1[i] = parseInt($(res).text());
        });

        let result2 = {};
        const result2Maps = team2.find('.mapscore');
        result2Maps.each((i, res) => {
          result2[i] = parseInt($(res).text());
        });

        const objData = {
          event: header.children('.eventName').children().first().children().first().text().trim(),
          maps,
          team1: {
            name: team1.find('.teams span').text().trim(),
            crest: team1.find('img').attr('src'),
            result: result1,
            total: parseInt(team1.children().last().text())
          },
          team2: {
            name: team2.find('.teams span').text().trim(),
            crest: team2.find('img').attr('src'),
            result: result2,
            total: parseInt(team2.children().last().text())
          },
          matchId
        };

        results.push(objData);
      });

      callback(results, error);
    });
  }
}
