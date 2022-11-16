import cheerio from 'cheerio'
import fetch from 'node-fetch'
import { CONFIG, USER_AGENT } from './config'

interface IPlayer {
  id: number
  team: {
    id: number
    name: string
  }
  image: string
  nickname: string
  name: string
  age: number | null
  rating: number
  impact: number | null
  dpr: number | null
  adr: number | null
  kast: number | null
  kpr: number
  headshots: number
  mapsPlayed: number | null
}

interface ISearchedPlayer {
  id: number
  nickname: string
}

export async function getPlayerById(id: number): Promise<IPlayer> {
  const url = `${CONFIG.BASE}/${CONFIG.PLAYERS}/${id}/_`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const mainTable = $('.playerSummaryStatBox')

    if (!mainTable.html()) {
      throw new Error(
        'There is no player available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
      )
    }

    const imageBlock = mainTable.find('.summaryBodyshotContainer')

    const image = imageBlock.children('img').eq(1).attr('src') as string

    const mainTableContent = mainTable.find('.summaryBreakdownContainer')

    const nickname = mainTableContent.find('.summaryNickname').text()
    const name = mainTableContent.find('.summaryRealname').text().trim()
    const teamName = mainTableContent.find('.SummaryTeamname').text()
    const teamId = Number(
      /* istanbul ignore next */ mainTableContent
        .find('.SummaryTeamname')
        .find('a')
        .attr('href')
        ?.split('/')[3]
    )
    const age = parseInt(mainTableContent.find('.summaryPlayerAge').text(), 10)

    const statRow1 = mainTableContent
      .find('.summaryStatBreakdownRow')
      .eq(0)
      .find('.summaryStatBreakdown')

    const rating = parseFloat(statRow1.eq(0).find('.summaryStatBreakdownDataValue').text())
    const dpr = parseFloat(statRow1.eq(1).find('.summaryStatBreakdownDataValue').text())
    const kast = parseFloat(statRow1.eq(2).find('.summaryStatBreakdownDataValue').text())

    const statRow2 = mainTableContent
      .find('.summaryStatBreakdownRow')
      .eq(1)
      .find('.summaryStatBreakdown')

    const impact = parseFloat(statRow2.eq(0).find('.summaryStatBreakdownDataValue').text())
    const adr = parseFloat(statRow2.eq(1).find('.summaryStatBreakdownDataValue').text())
    const kpr = parseFloat(statRow2.eq(2).find('.summaryStatBreakdownDataValue').text())

    const additionalStats = $('.statistics .columns .col')

    const headshots = parseFloat(
      additionalStats.eq(0).children('.stats-row').eq(1).children('span').eq(1).text()
    )

    const maps = parseInt(
      additionalStats.eq(0).children('.stats-row').eq(6).children('span').eq(1).text(),
      10
    )

    return {
      id: Number(id),
      team: {
        id: teamId,
        name: teamName,
      },
      image,
      nickname,
      name,
      age: age || null,
      rating,
      impact: impact || null,
      dpr: dpr || null,
      adr: adr || null,
      kast: kast || null,
      kpr,
      headshots,
      mapsPlayed: maps || null,
    }
  } catch (error) {
    throw new Error(error as any)
  }
}

export async function getPlayersByName(name: string): Promise<ISearchedPlayer[]> {
  const url = `${CONFIG.BASE}/search?query=${name}`

  try {
    const body = await (
      await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      })
    ).text()

    const $ = cheerio.load(body, {
      normalizeWhitespace: true,
    })

    const playerTable = $('.table-header:contains("Player")').parent().parent()
    $('.table-header:contains("Player")').parent().remove() //	Removes the Player header row

    if (!playerTable.html()) {
      throw new Error(
        'Could not find players beginning with that string' // Search is not fuzzy. "s1m" will find "s1mple" but "s1n" or "sim" will not.
      )
    }

    const players: ISearchedPlayer[] = []
    playerTable.children().each((_, tr) => {
      const info = $(tr).find('a').attr('href')?.split('/') //	<a href="/players/12345/nickname">
      if (!info || !info[2] || !info[3]) {
        throw new Error('Could not parse player search table') //	This should never occur for successful searches (ie if a table was in fact returned)
      }
      const p: ISearchedPlayer = { id: +info[2], nickname: info[3] }
      players.push(p)
    })

    return players
  } catch (error) {
    throw new Error(error as any)
  }
}
