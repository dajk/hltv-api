import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG } from './config'

interface IResult {
  event: string
  maps: string | 'bo3'
  team1: {
    name: string
    crest: string
    result: number
  }
  team2: {
    name: string
    crest: string
    result: number
  }
  matchId: string
}

export async function getResults(): Promise<IResult[]> {
  const url = `${CONFIG.BASE}${CONFIG.RESULTS}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': 'node-fetch' },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const results: IResult[] = []

    const resultElements = $('.results-all .result-con')
    $(resultElements).each((_i, element) => {
      const el = $(element).find('tr')
      const team1 = el.children('.team-cell').first()
      const team2 = el.children('.team-cell').last()
      const matchId = $(element).children('a').attr('href')!
      const maps = el.find('.map-text')
      const result1 = el.find('.result-score').children('span').first()
      const result2 = el.find('.result-score').children('span').last()

      const objData: IResult = {
        event: el.find('.event-name').text(),
        maps: maps.text(),
        team1: {
          name: team1.find('.team').text(),
          crest: team1.find('img').attr('src')!,
          result: parseInt(result1.text(), 10),
        },
        team2: {
          name: team2.find('.team').text(),
          crest: team2.find('img').attr('src')!,
          result: parseInt(result2.text(), 10),
        },
        matchId,
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
    throw new Error(error)
  }
}
