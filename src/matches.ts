import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, MAPS } from './config'

interface IEvent {
  name: string
  crest: string
}

interface ITeam {
  name: string
  crest: string
}

interface IMatch {
  id: number
  time: string
  event: IEvent
  stars: number
  map: string
  teams: ITeam[]
}

export async function getMatches() {
  const url = `${CONFIG.BASE}/${CONFIG.MATCHES}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': 'node-fetch' },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const allContent = $('.upcomingMatch')
    const matches: IMatch[] = []

    allContent.map((_i, element) => {
      const el = $(element)

      const link = el.children('a').attr('href')!
      const id = parseInt(link.split('/')[2], 10)
      const time = new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
      const event = {
        name: el.find('.matchEventName').text(),
        crest: el.find('.matchEventLogo').attr('src')!,
      }
      const stars = Number(el.attr('stars'))
      const map: keyof typeof MAPS = el.find('.matchMeta').text() as any

      const team1El = el.find('.matchTeam.team1')
      const team2El = el.find('.matchTeam.team2')

      const team1 = {
        name: team1El.find('.matchTeamName').text(),
        crest: team1El.find('.matchTeamLogo').attr('src')!,
      }

      const team2 = {
        name: team2El.find('.matchTeamName').text(),
        crest: team2El.find('.matchTeamLogo').attr('src')!,
      }

      const response: IMatch = {
        id,
        time,
        event,
        stars,
        map: MAPS[map] || map,
        teams: [team1, team2],
      }

      matches[matches.length] = response
    })

    if (!matches.length) {
      throw new Error(
        'There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    return matches
  } catch (error) {
    throw new Error(error as any)
  }
}
