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
        const matchMap = $(element).children().eq(0).text();
        const homeTeam = $(element).children().eq(1).text().trim();
        const homeTeamCrest = $(element).children().eq(1).find('img').attr('src');
        const homeTeamScore = parseInt($(element).children().eq(2).children('span').first().text());
        const awayTeamScore = parseInt($(element).children().eq(2).children('span').last().text());
        const awayTeam = $(element).children().eq(3).text().trim();
        const awayTeamCrest = $(element).children().eq(3).find('img').attr('src');
        const matchid = $(element).children().eq(4).children('a').attr('href').split('match/')[1];

        const objData = {
          matchMap,
          homeTeam,
          homeTeamCrest,
          homeTeamScore,
          awayTeamScore,
          awayTeam,
          awayTeamCrest,
          matchid
        };

        attr[this.type].push(objData);
      });

      callback(attr, error);
    });
  }
}
