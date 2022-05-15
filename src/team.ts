import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'

interface IPlayer {
  fullname: string
  image: string
  nickname: string
  country?: {
    name: string
    flag: string
  }
}

interface ITeam {
  id: number
  name: string
  logo: string
  players: IPlayer[]
  coach: string
  ranking: number
  averagePlayerAge: number
}

export async function getTeamById(id: number): Promise<ITeam> {
  const url = `${CONFIG.BASE}/${CONFIG.TEAM}/${id}/_`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const teamProfile = $('.teamProfile')

    if (!teamProfile.html()) {
      throw new Error(
        'There is no team available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    const lineup = teamProfile.find('.bodyshot-team').children()

    const players: IPlayer[] = []

    lineup.each((_i, p) => {
      const player = $(p)
      const countryName = player.find('.flag').attr('title') as string
      const countryFlag = `${CONFIG.BASE}${player.find('.flag').attr('src') as string}`

      players.push({
        fullname: player.find('img').attr('title') as string,
        image: player.find('img').attr('src') as string,
        nickname: player.attr('title') as string,
        country: countryName
          ? {
              name: countryName,
              flag: countryFlag,
            }
          : /* istanbul ignore next */
            undefined,
      })
    })

    const name = teamProfile.find('.profile-team-name').text()
    const logo = teamProfile.find('.teamlogo').attr('src') as string

    const statsContainer = teamProfile.find('.profile-team-stats-container').children()
    const ranking = Number(statsContainer.eq(0).find('.right').text().replace('#', ''))
    const averagePlayerAge = Number(statsContainer.eq(2).find('.right').text())
    const coach = statsContainer.eq(3).find('.right').text().trim()

    return {
      id,
      name,
      logo,
      ranking,
      coach,
      averagePlayerAge,
      players,
    }
  } catch (error) {
    throw new Error(error as any)
  }
}
