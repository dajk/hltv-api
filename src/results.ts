import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'
import { ResultsResult, ResultsTeam } from './types'

export async function getResults(): Promise<ResultsResult[]> {
  const url = `${CONFIG.BASE}/${CONFIG.RESULTS}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const results: ResultsResult[] = []

    const resultElements = $('.allres .result-con')
    $(resultElements).each((_i, element) => {
      const el = $(element).find('tr')

      const timestamp = Number(el.parents('.result-con').attr('data-zonedgrouping-entry-unix'))

      const time = new Date(timestamp).toISOString()
      const team1El = el.children('.team-cell').first()
      const team2El = el.children('.team-cell').last()
      const matchId = $(element).children('a').attr('href') as string
      const maps = el.find('.map-text')
      const result1 = el.find('.result-score').children('span').first()
      const result2 = el.find('.result-score').children('span').last()

      const team1: ResultsTeam = {
        name: team1El.find('.team').text(),
        logo: /* istanbul ignore next */ team1El.find('img').attr('src')?.includes('https://')
          ? (team1El.find('img').attr('src') as string)
          : `${CONFIG.BASE}${team1El.find('img').attr('src')}`,
        result: parseInt(result1.text(), 10),
      }

      const team2: ResultsTeam = {
        name: team2El.find('.team').text(),
        logo: /* istanbul ignore next */ team2El.find('img').attr('src')?.includes('https://')
          ? (team2El.find('img').attr('src') as string)
          : `${CONFIG.BASE}${team2El.find('img').attr('src')}`,
        result: parseInt(result2.text(), 10),
      }

      const objData: ResultsResult = {
        event: {
          name: el.find('.event-name').text(),
          logo: /* istanbul ignore next */ el.find('.event-logo').attr('src')?.includes('https://')
            ? (el.find('.event-logo').attr('src') as string)
            : `${CONFIG.BASE}${el.find('.event-logo').attr('src')}`,
        },
        maps: maps.text(),
        time,
        teams: [team1, team2],
        matchId: parseInt(matchId.split('/')[2], 10),
      }

      results.push(objData)
    })

    if (!results.length) {
      throw new Error(
        'There are no results available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    return results
  } catch (error) {
    throw new Error(error as any)
  }
}
