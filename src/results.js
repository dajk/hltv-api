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
        const el = $(element).find('tr');
        const team1 = el.children('.team-cell').first();
        const team2 = el.children('.team-cell').last();
        const matchId = $(element).children('a').attr('href');
        const maps = el.find('.map');
        const result1 = el.find('.result-score').children('span').first();
        const result2 = el.find('.result-score').children('span').last();

        const objData = {
          event: el.find('.event-name').text().trim(),
          maps: maps.text().trim(),
          team1: {
            name: team1.find('.team').text().trim(),
            crest: team1.find('img').attr('src'),
            result: parseInt(result1.text().trim())
          },
          team2: {
            name: team2.find('.team').text().trim(),
            crest: team2.find('img').attr('src'),
            result: parseInt(result2.text().trim())
          },
          matchId
        };

        results.push(objData);
      });

      callback(results, error);
    });
  }
}
