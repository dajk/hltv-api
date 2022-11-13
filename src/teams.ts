import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'
import { Teams, TeamsPlayer, TeamsTeam } from './types'

export async function getTopTeams(): Promise<Teams> {
  const url = `${CONFIG.BASE}/${CONFIG.TEAMS}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const allContent = $('.ranked-team')
    const teams: Teams = []

    allContent.map((_i, element) => {
      const el = $(element)

      const id = Number((el.find('.moreLink').attr('href') as string).split('/')[2])
      const ranking = parseInt(el.find('.position').text().replace('#', ''), 10)
      const logo = el.find('.team-logo').find('img').attr('src') as string
      const name = el.find('.teamLine').find('.name').text()
      const players: TeamsPlayer[] = []

      el.find('.lineup')
        .children()
        .children()
        .children()
        .each((__i, p) => {
          const player = $(p).find('a')
          const pic = player.find('.playerPicture')
          const nick = player.find('.nick')
          const country = nick.find('img')

          players.push({
            fullname: pic.attr('title') as string,
            image: pic.attr('src') as string,
            nickname: nick.text(),
            country: {
              name: country.attr('title') as string,
              flag: `${CONFIG.BASE}${country.attr('src') as string}`,
            },
          })
        })

      const response: TeamsTeam = {
        id,
        ranking,
        name,
        logo,
        players,
      }

      teams[teams.length] = response
    })

    if (!teams.length) {
      throw new Error(
        'There are no teams available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    return teams
  } catch (error) {
    throw new Error(error as any)
  }
}
