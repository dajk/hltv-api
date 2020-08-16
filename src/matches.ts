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

  /**
   * Creates an instance of Matches.
   *
   * @param {string} matchId
   * @param {any} callback
   *
   * @memberOf Matches
   */
  constructor(callback: any) {
    this.callback = callback
  }

  getSingleMatch(matchId: string) {
    const uri = `${CONFIG.BASE}/${matchId}`

    request({ uri }, (error, response, body) => {
      const $ = cheerio.load(body, {
        normalizeWhitespace: true,
      })

      const stats: any[] = []

      const allContent = $('.matchstats').find('#all-content')

      const team1Stats = allContent
        .children('table.totalstats')
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
        .children('table.totalstats')
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

      const allContent = $('.upcomingMatch')

      const returnArr: any[] = []

      allContent.map((index: Number, element: CheerioElement) => {
        const el = $(element)

        const link = el.children('a').attr('href')
        const id = parseInt(link.split('/')[2], 10)
        const time = new Date(
          parseInt(el.find('.matchTime').attr('data-unix'), 10)
        ).toISOString()
        const event = {
          name: el.find('.matchEventName').text(),
          crest: el.find('.matchEventLogo').attr('src'),
        }
        const stars = el.attr('stars')
        const map: keyof typeof MAPS = el.find('.matchMeta').text() as any

        const team1El = el.find('.matchTeam.team1')
        const team2El = el.find('.matchTeam.team2')

        const team1 = {
          name: team1El.find('.matchTeamName').text(),
          crest: team1El.find('.matchTeamLogo').attr('src'),
        }

        const team2 = {
          name: team2El.find('.matchTeamName').text(),
          crest: team2El.find('.matchTeamLogo').attr('src'),
        }

        const responseObj = {
          id,
          link,
          time,
          event,
          stars,
          map: MAPS[map] ? MAPS[map] : undefined,
          format: !MAPS[map] ? map : undefined,
          teams: [team1, team2],
        }

        returnArr[returnArr.length] = responseObj

        return responseObj
      })

      this.callback(returnArr, error)
    })
  }
}
