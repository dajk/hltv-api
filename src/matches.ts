import request from 'request'
import cheerio from 'cheerio'
import { CONFIG, MAPS } from './config'

/**
 * Scraping matches
 *
 * @export
 * @class Matches
 */
export default class Matches {
  private callback: Function

  private matchId: string

  /**
   * Creates an instance of Matches.
   *
   * @param {string} matchId
   * @param {any} callback
   *
   * @memberOf Matches
   */
  constructor(matchId: string, callback: any) {
    if (matchId.split('/').length >= 3) {
      this.matchId =
        parseInt(matchId.split('/')[1], 10) > 100
          ? matchId.split('/')[1]
          : matchId.split('/')[2]
    } else {
      this.matchId = matchId
    }
    this.callback = callback
  }

  getSingleMatch() {
    const uri = `${CONFIG.BASE}${CONFIG.MATCHES}/${this.matchId}/-`

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })

      const stats: any[] = []

      const allContent = $('.matchstats').find('#all-content')

      const team1Stats = allContent
        .children('table.table')
        .first()
        .children('tbody')
      const list1 = team1Stats.children('tr').not('.header-row')

      list1.each((i, element) => {
        const el = $(element)
        const playerName = el
          .find('.players .gtSmartphone-only')
          .text()
          .replace(/'/g, '')
        const playerId = el
          .find('.players')
          .children('a')
          .attr('href')
        const kills = parseInt(
          el
            .find('td.kd')
            .text()
            .split('-')[0],
          10
        )
        const deaths = parseInt(
          el
            .find('td.kd')
            .text()
            .split('-')[1],
          10
        )
        const plusMinus = parseInt(el.find('td.plus-minus').text(), 10)
        const adr = parseFloat(el.find('td.adr').text())
        const kast = parseFloat(el.find('td.kast').text())
        const rating = parseFloat(el.find('td.rating').text())

        const objData = {
          playerName,
          playerId,
          kills,
          deaths,
          plusMinus,
          adr,
          kast,
          rating,
        }

        stats.push(objData)
      })

      const team2Stats = allContent
        .children('table.table')
        .last()
        .children('tbody')
      const list2 = team2Stats.children('tr').not('.header-row')

      list2.each((i, element) => {
        const el = $(element)
        const playerName = el
          .find('.players .gtSmartphone-only')
          .text()
          .replace(/'/g, '')
        const playerId = el
          .find('.players')
          .children('a')
          .attr('href')
        const kills = parseInt(
          el
            .find('td.kd')
            .text()
            .split('-')[0],
          10
        )
        const deaths = parseInt(
          el
            .find('td.kd')
            .text()
            .split('-')[1],
          10
        )
        const plusMinus = parseInt(el.find('td.plus-minus').text(), 10)
        const adr = parseFloat(el.find('td.adr').text())
        const kast = parseFloat(el.find('td.kast').text())
        const rating = parseFloat(el.find('td.rating').text())

        const objData = {
          playerName,
          playerId,
          kills,
          deaths,
          plusMinus,
          adr,
          kast,
          rating,
        }

        stats.push(objData)
      })

      this.callback(stats, error)
    })
  }

  getAllMatches() {
    const uri = `${CONFIG.BASE}/${CONFIG.MATCHES}`

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })

      const allContent = $('.upcoming-matches .match-day > a')

      const returnArr: any[] = []

      allContent.map((index: Number, element: CheerioElement) => {
        const el = $(element)
        const teamCells = el.find('td.team-cell')

        const link = el.attr('href')
        const id = parseInt(link.split('/')[2], 10)
        const time = new Date(
          parseInt(
            el
              .find('td.time')
              .children('div')
              .attr('data-unix'),
            10
          )
        ).toISOString()
        const teams: Object[] = []
        const event = {
          name: el
            .find('td.event')
            .children('span')
            .text(),
          crest: el
            .find('td.event')
            .children('img')
            .attr('src'),
        }
        const stars = el.find('div.stars')[0]
          ? el.find('div.stars')[0].children.length
          : 0
        const map: string = el.find('div.map-text').text()

        teamCells.map((index2: number, teamElement: CheerioElement) => {
          const teamEl = $(teamElement)

          const name = teamEl
            .children('div')
            .children('div')
            .text()
          const crest = teamEl
            .children('div')
            .children('img')
            .attr('src')

          teams[teams.length] = {
            name,
            crest,
          }
          return true
        })

        const responseObj = {
          id,
          link,
          time,
          event,
          stars,
          map: MAPS[map] ? MAPS[map] : undefined,
          format: !MAPS[map] ? map : undefined,
          teams,
        }

        returnArr[returnArr.length] = responseObj

        return responseObj
      })

      this.callback(returnArr, error)
    })
  }
}
