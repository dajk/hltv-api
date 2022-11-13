import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, MAPS, USER_AGENT } from './config'
import { MatchesEvent, MatchesMatch } from './types'

export async function getMatches(): Promise<MatchesMatch[]> {
  const url = `${CONFIG.BASE}/${CONFIG.MATCHES}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const allContent = $('.upcomingMatch')
    const matches: MatchesMatch[] = []

    allContent.map((_i, element) => {
      const el = $(element)

      const link = el.children('a').attr('href') as string
      const id = Number(link.split('/')[2])
      const time = new Date(parseInt(el.find('.matchTime').attr('data-unix')!, 10)).toISOString()
      const event: MatchesEvent = {
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
      }

      const team2 = {
        id: Number(el.attr('team2')),
        name: team2El.find('.matchTeamName').text() || 'n/a',
        logo: team2El.find('.matchTeamLogo').attr('src') as string,
      }

      const response: MatchesMatch = {
        id,
        time,
        event,
        stars,
        maps: MAPS[map] || map,
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
