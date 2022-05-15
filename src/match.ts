import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'

interface IHalfResult {
  side: 't' | 'ct'
  rounds: number
}

interface IResult {
  first: IHalfResult
  second: IHalfResult
  ext?: number
}

interface IMapTeam {
  logo?: string
  name: string
  result: IResult
}

interface IMap {
  name: string
  pick: string
  teams: IMapTeam[]
}

interface IStats {
  name: string
  nickname: string
  id: number
  kills: number
  deaths: number
  adr: number
  kast: number
  rating: number
}

interface IEvent {
  name: string
  logo: string
}

interface ITeam {
  name: string
  logo: string
  result: number
  players: IStats[]
}

interface IMatch {
  id: number
  time: string
  event: IEvent
  teams: ITeam[]
  maps: IMap[]
}

export async function getMatchById(matchId: number): Promise<IMatch> {
  const url = `${CONFIG.BASE}/${CONFIG.MATCHES}/${matchId}/_`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const stats1: IStats[] = []
    const stats2: IStats[] = []
    const allContent = $('.matchstats').find('#all-content')

    const team1Stats = allContent.children('table.totalstats').first().children('tbody')
    const list1 = team1Stats.children('tr').not('.header-row')

    list1.each((i, element) => {
      const el = $(element)
      const nameEl = el.find('.players .gtSmartphone-only')
      const name = nameEl.text().replace(/'\w+' /, '')
      const nickname = nameEl.find('.player-nick').text()
      const id = Number(
        /* istanbul ignore next */ el
          .find('.players')
          .find('a')
          .attr('href')
          ?.split('/')[2] as string
      )
      const kills = parseInt(el.find('td.kd').text().split('-')[0], 10)
      const deaths = parseInt(el.find('td.kd').text().split('-')[1], 10)
      const adr = parseFloat(el.find('td.adr').text())
      const kast = parseFloat(el.find('td.kast').text())
      const rating = parseFloat(el.find('td.rating').text())

      const objData: IStats = {
        name,
        id,
        nickname,
        kills,
        deaths,
        adr,
        kast,
        rating,
      }

      stats1.push(objData)
    })

    const team2Stats = allContent.children('table.totalstats').last().children('tbody')
    const list2 = team2Stats.children('tr').not('.header-row')

    list2.each((i, element) => {
      const el = $(element)
      const nameEl = el.find('.players .gtSmartphone-only')
      const nick = nameEl.find('.player-nick').text()
      nameEl.find('.player-nick').remove()

      const name = nameEl.text().replace("''", '')
      const nickname = nick
      const id = Number(
        /* istanbul ignore next */ el
          .find('.players')
          .find('a')
          .attr('href')
          ?.split('/')[2] as string
      )
      const kills = parseInt(el.find('td.kd').text().split('-')[0], 10)
      const deaths = parseInt(el.find('td.kd').text().split('-')[1], 10)
      const adr = parseFloat(el.find('td.adr').text())
      const kast = parseFloat(el.find('td.kast').text())
      const rating = parseFloat(el.find('td.rating').text())

      const objData: IStats = {
        name,
        nickname,
        id,
        kills,
        deaths,
        adr,
        kast,
        rating,
      }

      stats2.push(objData)
    })

    if (!stats1.length || !stats2.length) {
      throw new Error(
        'Something went wrong, here is no correct stats found for this match. Please create an issue in this repository https://github.com/dajk/hltv-api'
      )
    }

    const mapsEl = $('.mapholder')

    const maps: IMap[] = []

    mapsEl.each((_, element) => {
      const el = $(element)

      const mapTeam1: IMapTeam = {
        name: el.find('.results-left').find('.results-teamname').text(),
        result: {
          first: {
            side: el.find('.results-center-half-score').children().eq(1).attr('class') as any,
            rounds: Number(el.find('.results-center-half-score').children().eq(1).text()),
          },
          second: {
            side: el.find('.results-center-half-score').children().eq(5).attr('class') as any,
            rounds: Number(el.find('.results-center-half-score').children().eq(5).text()),
          },
          ext: Number(el.find('.results-center-half-score').children().eq(11).text()),
        },
      }

      const mapTeam2: IMapTeam = {
        name: el.find('.results-right').find('.results-teamname').text(),
        result: {
          first: {
            side: el.find('.results-center-half-score').children().eq(3).attr('class') as any,
            rounds: Number(el.find('.results-center-half-score').children().eq(3).text()),
          },
          second: {
            side: el.find('.results-center-half-score').children().eq(7).attr('class') as any,
            rounds: Number(el.find('.results-center-half-score').children().eq(7).text()),
          },
          ext: Number(el.find('.results-center-half-score').children().eq(13).text()),
        },
      }

      maps.push({
        name: el.find('.mapname').text(),
        pick: el.find('.pick').find('.results-teamname').text(),
        teams: [mapTeam1, mapTeam2],
      })
    })

    const timeAndEvent = $('.timeAndEvent')
    const time = new Date(timeAndEvent.find('.time').data('unix')).toISOString()
    const event = {
      name: timeAndEvent.find('.event').find('a').text(),
      logo: '',
    }

    const team1El = $('.teamsBox').children('.team').eq(0)
    const team2El = $('.teamsBox').children('.team').eq(1)

    const team1: ITeam = {
      name: team1El.find('.teamName').text(),
      logo: /* istanbul ignore next */ team1El.find('.logo').attr('src')?.includes('https')
        ? (team1El.find('.logo').attr('src') as string)
        : `${CONFIG.BASE}${team1El.find('.logo').attr('src')}`,
      result: Number(team1El.find('.team1-gradient').children().last().text()),
      players: stats1,
    }

    const team2: ITeam = {
      name: team2El.find('.teamName').text(),
      logo: /* istanbul ignore next */ team2El.find('.logo').attr('src')?.includes('https')
        ? (team2El.find('.logo').attr('src') as string)
        : `${CONFIG.BASE}${team2El.find('.logo').attr('src')}`,
      result: Number(team2El.find('.team2-gradient').children().last().text()),
      players: stats2,
    }

    return {
      id: Number(matchId),
      time,
      event,
      teams: [team1, team2],
      maps,
    }
  } catch (error) {
    throw new Error(error as any)
  }
}
