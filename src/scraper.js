import request from 'request';
import { parseString } from 'xml2js';
import cheerio from 'cheerio';

/**
 * Scraping data
 * 
 * @export
 * @class Scraper
 */
export default class Scraper {

  /**
   * Creates an instance of Scraper.
   * 
   * @param {string} type 
   * @param {any} callback 
   * 
   * @memberOf Scraper
   */
  constructor(type, callback) {
    this.type = type;

    const uri = `http://www.hltv.org/${this.type}s/`;
    let attr = {};

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body);

      const matchListRow = $('.matchListRow');

      attr = {
        callbackLength: matchListRow.length
      };

      attr[this.type] = [];

      $(matchListRow).each((i, element) => {
        const map = $(element).children().eq(0).text();
        const team1 = $(element).children().eq(1).text().trim();
        const team1Crest = $(element).children().eq(1).find('img').attr('src');
        const team1Score = parseInt($(element).children().eq(2).children('span').first().text());
        const team2Score = parseInt($(element).children().eq(2).children('span').last().text());
        const team2 = $(element).children().eq(3).text().trim();
        const team2Crest = $(element).children().eq(3).find('img').attr('src');
        const matchId = $(element).children().eq(4).children('a').attr('href').split('match/')[1];

        const objData = {
          map,
          team1,
          team1Crest,
          team1Score,
          team2Score,
          team2,
          team2Crest,
          matchId
        };

        attr[this.type].push(objData);
      });

      callback(attr, error);
    });
  }
}
