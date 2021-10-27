import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG } from './config'

interface IStats {
  playerName: string
  playerId: string
  kills: number
  deaths: number
  plusMinus: number
  adr: number
  kast: number
  rating: number
}

export async function getStatsByMatchId(matchId: number): Promise<IStats[]> {
  const url = `${CONFIG.BASE}/${CONFIG.MATCHES}/${matchId}/_`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': 'node-fetch' },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const stats: IStats[] = []
    const allContent = $('.matchstats').find('#all-content')

    const team1Stats = allContent.children('table.totalstats').first().children('tbody')
    const list1 = team1Stats.children('tr').not('.header-row')

    list1.each((i, element) => {
      const el = $(element)
      const playerName = el.find('.players .gtSmartphone-only').text().replace(/'/g, '')
      const playerId = el.find('.players').find('a').attr('href') as string
      const kills = parseInt(el.find('td.kd').text().split('-')[0], 10)
      const deaths = parseInt(el.find('td.kd').text().split('-')[1], 10)
      const plusMinus = parseInt(el.find('td.plus-minus').text(), 10)
      const adr = parseFloat(el.find('td.adr').text())
      const kast = parseFloat(el.find('td.kast').text())
      const rating = parseFloat(el.find('td.rating').text())

      const objData: IStats = {
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

    const team2Stats = allContent.children('table.totalstats').last().children('tbody')
    const list2 = team2Stats.children('tr').not('.header-row')

    list2.each((i, element) => {
      const el = $(element)
      const playerName = el.find('.players .gtSmartphone-only').text().replace(/'/g, '')
      const playerId = el.find('.players').find('a').attr('href') as string
      const kills = parseInt(el.find('td.kd').text().split('-')[0], 10)
      const deaths = parseInt(el.find('td.kd').text().split('-')[1], 10)
      const plusMinus = parseInt(el.find('td.plus-minus').text(), 10)
      const adr = parseFloat(el.find('td.adr').text())
      const kast = parseFloat(el.find('td.kast').text())
      const rating = parseFloat(el.find('td.rating').text())

      const objData: IStats = {
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

    if (!stats.length) {
      throw new Error(
        'Something went wrong, here is no stats found for this match. Please create an issue in this repository https://github.com/dajk/hltv-api'
      )
    }
    return stats
  } catch (error) {
    throw new Error(error as any)
  }
}
