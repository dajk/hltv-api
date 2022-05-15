import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'

interface IPlayer {
  id: number
  team: string
  nickname: string
  slug: string
  mapsPlayed: number
  kd: number
  rating: number
}

export async function getTopPlayers(): Promise<IPlayer[]> {
  const url = `${CONFIG.BASE}/${CONFIG.PLAYERS}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const allContent = $('.stats-table.player-ratings-table tbody tr')
    const players: IPlayer[] = []

    allContent.map((_i, element) => {
      const el = $(element)

      const link = el.find('.playerCol').find('a').attr('href') as string
      const [_, __, ___, id, slug] = link.split('/')

      const td = el.find('td')

      const nickname = td.eq(0).text()
      const team = td.eq(1).find('img').attr('title') as string
      const maps = td.eq(2).text()
      const kd = td.eq(5).text()
      const rating = td.eq(6).text()

      const response: IPlayer = {
        id: parseInt(id, 10),
        team,
        nickname,
        slug,
        mapsPlayed: parseInt(maps, 10),
        kd: parseFloat(kd),
        rating: parseFloat(rating),
      }

      players[players.length] = response
    })

    if (!players.length) {
      throw new Error(
        'There are no players available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    return players
  } catch (error) {
    throw new Error(error as any)
  }
}
