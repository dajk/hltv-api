import request from 'request';
import cheerio from 'cheerio';
import { CONFIG } from './config';

/**
 * Scraping matches
 * 
 * @export
 * @class Matches
 */
export default class Matches {

  /**
   * Creates an instance of Matches.
   * 
   * @param {string} matchId
   * @param {any} callback 
   * 
   * @memberOf Matches
   */
  constructor(matchId, callback) {
    const uri = `${CONFIG.BASE}/${matchId}`;

    request({ uri }, (error, response, body) => {

      const $ = cheerio.load(body, {
        normalizeWhitespace: true
      });

      let stats = [];

      const allContent = $('.matchstats').find('#all-content');

      const team1Stats = allContent.children('table.table').first().children('tbody');
      const list1 = team1Stats.children('tr').not('.header-row');

      list1.each((i, element) => {
        const el = $(element);
        const playerName = el.find('.players .gtSmartphone-only').text().replace(/'/g, '');
        const playerId = el.find('.players').children('a').attr('href');
        const kills = parseInt(el.find('td.kd').text().split('-')[0]);
        const deaths = parseInt(el.find('td.kd').text().split('-')[1]);
        const plusMinus = parseInt(el.find('td.plus-minus').text());
        const adr = parseFloat(el.find('td.adr').text(), 10);
        const kast = parseFloat(el.find('td.kast').text(), 10);
        const rating = parseFloat(el.find('td.rating').text(), 10);

        const objData = {
          playerName,
          playerId,
          kills,
          deaths,
          plusMinus,
          adr,
          kast,
          rating
        };

        stats.push(objData);
      });

      const team2Stats = allContent.children('table.table').last().children('tbody');
      const list2 = team2Stats.children('tr').not('.header-row');

      list2.each((i, element) => {
        const el = $(element);
        const playerName = el.find('.players .gtSmartphone-only').text().replace(/'/g, '');
        const playerId = el.find('.players').children('a').attr('href');
        const kills = parseInt(el.find('td.kd').text().split('-')[0]);
        const deaths = parseInt(el.find('td.kd').text().split('-')[1]);
        const plusMinus = parseInt(el.find('td.plus-minus').text());
        const adr = parseFloat(el.find('td.adr').text(), 10);
        const kast = parseFloat(el.find('td.kast').text(), 10);
        const rating = parseFloat(el.find('td.rating').text(), 10);

        const objData = {
          playerName,
          playerId,
          kills,
          deaths,
          plusMinus,
          adr,
          kast,
          rating
        };

        stats.push(objData);
      });

      callback(stats, error);
    });
  }
}
