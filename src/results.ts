import request from 'request'
import cheerio from 'cheerio'
import { CONFIG } from './config'

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
  constructor(callback: any) {
    const uri = `${CONFIG.BASE}${CONFIG.RESULTS}`

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })

      const resultElements = $('.results-all .result-con')

      const results: any[] = []

      $(resultElements).each((i, element) => {
        const el = $(element).find('tr')
        const team1 = el.children('.team-cell').first()
        const team2 = el.children('.team-cell').last()
        const matchId = $(element)
          .children('a')
          .attr('href')
        const maps = el.find('.map-text')
        const result1 = el
          .find('.result-score')
          .children('span')
          .first()
        const result2 = el
          .find('.result-score')
          .children('span')
          .last()

        const objData = {
          event: el.find('.event-name').text(),
          maps: maps.text(),
          team1: {
            name: team1.find('.team').text(),
            crest: team1.find('img').attr('src'),
            result: parseInt(result1.text(), 10),
          },
          team2: {
            name: team2.find('.team').text(),
            crest: team2.find('img').attr('src'),
            result: parseInt(result2.text(), 10),
          },
          matchId,
        }

        results.push(objData)
      })

      callback(results, error)
    })
  }
}
