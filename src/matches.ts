import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, MAPS, USER_AGENT } from './config'

interface IEvent {
  name: string
  logo: string
}

interface ITeam {
  name: string
  logo: string
  result: number
}

interface IMatch {
  id: number
  time: string
  event: IEvent
  stars: number
  maps: string
  teams: ITeam[]
  isLive: boolean
}

export async function getMatches(eventId?: number, includeLiveMatches?: boolean) {
  const url =
    eventId !== undefined
      ? `${CONFIG.BASE}/events/${eventId}/${CONFIG.MATCHES}`
      : `${CONFIG.BASE}/${CONFIG.MATCHES}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const selectors = ['.upcomingMatch']
    if (includeLiveMatches) {
      selectors.push('.liveMatch')
    }
    const allContent = $(selectors.join(','))
    const matches: IMatch[] = []

    allContent.map((_i, element) => {
      const el = $(element)

      const isLive = el.hasClass('liveMatch')
      const link = el.children('a').attr('href') as string
      const id = Number(link.split('/')[2])
      const time = new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
      const event: IEvent = {
        name: el.find('.matchEventName').text(),
        logo: el.find('.matchEventLogo').attr('src') as string,
      }
      const stars = Number(el.attr('stars'))
      const map: keyof typeof MAPS = el.find('.matchMeta').text() as any

      const teamsEl = el.find('.matchTeams')

      // return just valid matches
      if (!teamsEl.html()) {
        return
      }

      const team1El = teamsEl.find('.matchTeam.team1')
      const team2El = teamsEl.find('.matchTeam.team2')

      const team1 = {
        id: Number(el.attr('team1')),
        name: team1El.find('.matchTeamName').text() || /* istanbul ignore next */ 'n/a',
        logo: team1El.find('.matchTeamLogo').attr('src') as string,
        result: includeLiveMatches
          ? parseInt(team1El.find('.matchTeamScore').text(), 10) || -1
          : -1,
      }

      const team2 = {
        id: Number(el.attr('team2')),
        name: team2El.find('.matchTeamName').text() || 'n/a',
        logo: team2El.find('.matchTeamLogo').attr('src') as string,
        result: includeLiveMatches
          ? parseInt(team2El.find('.matchTeamScore').text(), 10) || -1
          : -1,
      }

      const response: IMatch = {
        id,
        time,
        event,
        stars,
        maps: MAPS[map] || map,
        teams: [team1, team2],
        isLive,
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
