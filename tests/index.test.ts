import HLTV from '../src'
import { CONFIG } from '../src/config'
import getRSS from '../src/rss'

describe('hltv-api', () => {
  beforeEach(() => {
    CONFIG.RESULTS = '/results'
    CONFIG.MATCHES = '/matches'
  })
  it('should response with 10 news when we call `getNews`', async () => {
    const response = await HLTV.getNews()
    expect(response.length).toEqual(10)
  })

  it('should have all details when we call `getNews`', async () => {
    const response = await HLTV.getNews()
    const news = response[0]
    expect(news.title.length).toBeGreaterThan(3)
    expect(news.description).toBeDefined()
    expect(news.link).toContain(CONFIG.BASE)
    expect(news.date.length).toBeGreaterThan(10)
    expect(news.date).toContain('GMT')
  })

  it('should catch error in `getRSS`', async () => {
    const err = new Error('Error: Invalid XML')
    await expect(getRSS('error' as any)).rejects.toEqual(err)
  })

  it('should have all details when we call `getResults`', async () => {
    const response = await HLTV.getResults()
    expect(response.length).toBeDefined()
    const result = response[0]
    expect(result.team1.name).toBeDefined()
    expect(result.team1.crest).toContain(CONFIG.STATIC)
    expect(result.team2.name).toBeDefined()
    expect(result.team2.crest).toContain(CONFIG.STATIC)
    expect(result.matchId).toContain('/matches/')
  })

  it('should throw `getResults`', async () => {
    CONFIG.RESULTS = '/results_FAIL'
    const err = new Error(
      'Error: There are no results available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getResults()).rejects.toEqual(err)
  })

  it('should have match stats when we call `getMatches` with long Id', async () => {
    const response = await HLTV.getStatsByMatchId(
      'matches/2332210/liquid-vs-faze-blast-pro-series-miami-2019'
    )
    expect(response.length).toBeCloseTo(10, 5)
    expect(response).toMatchInlineSnapshot(`
          Array [
            Object {
              "adr": 70.2,
              "deaths": 36,
              "kast": 62,
              "kills": 34,
              "playerId": "/player/8520/NAF",
              "playerName": "Keith NAF Markovic",
              "plusMinus": -2,
              "rating": 0.93,
            },
            Object {
              "adr": 79.4,
              "deaths": 42,
              "kast": 54,
              "kills": 30,
              "playerId": "/player/8738/EliGE",
              "playerName": "Jonathan EliGE Jablonowski",
              "plusMinus": -12,
              "rating": 0.83,
            },
            Object {
              "adr": 62.8,
              "deaths": 37,
              "kast": 52,
              "kills": 28,
              "playerId": "/player/7687/nitr0",
              "playerName": "Nick nitr0 Cannella",
              "plusMinus": -9,
              "rating": 0.82,
            },
            Object {
              "adr": 60.8,
              "deaths": 38,
              "kast": 56,
              "kills": 24,
              "playerId": "/player/8797/Stewie2K",
              "playerName": "Jake Stewie2K Yip",
              "plusMinus": -14,
              "rating": 0.69,
            },
            Object {
              "adr": 51.4,
              "deaths": 38,
              "kast": 58,
              "kills": 17,
              "playerId": "/player/10394/Twistzz",
              "playerName": "Russel Twistzz Van Dulken",
              "plusMinus": -21,
              "rating": 0.64,
            },
            Object {
              "adr": 92.6,
              "deaths": 25,
              "kast": 78,
              "kills": 47,
              "playerId": "/player/3741/NiKo",
              "playerName": "Nikola NiKo Kovač",
              "plusMinus": 22,
              "rating": 1.53,
            },
            Object {
              "adr": 99.9,
              "deaths": 32,
              "kast": 72,
              "kills": 47,
              "playerId": "/player/8183/rain",
              "playerName": "Håvard rain Nygaard",
              "plusMinus": 15,
              "rating": 1.5,
            },
            Object {
              "adr": 73.6,
              "deaths": 26,
              "kast": 72,
              "kills": 35,
              "playerId": "/player/334/AdreN",
              "playerName": "Dauren AdreN Kystaubayev",
              "plusMinus": 9,
              "rating": 1.13,
            },
            Object {
              "adr": 73.1,
              "deaths": 27,
              "kast": 74,
              "kills": 34,
              "playerId": "/player/2757/GuardiaN",
              "playerName": "Ladislav GuardiaN Kovács",
              "plusMinus": 7,
              "rating": 1.1,
            },
            Object {
              "adr": 64.2,
              "deaths": 24,
              "kast": 78,
              "kills": 28,
              "playerId": "/player/885/olofmeister",
              "playerName": "Olof olofmeister Kajbjer",
              "plusMinus": 4,
              "rating": 1.06,
            },
          ]
        `)
  })

  it('should throw `getMatches`', async () => {
    CONFIG.MATCHES = '/matches_FAIL'
    const err = new Error(
      'Error: There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getMatches()).rejects.toEqual(err)
  })

  it('should have match stats when we call `getStaticMatchId` with long Id and slash infront of the path', async () => {
    const response = await HLTV.getStatsByMatchId(
      '/matches/2332210/liquid-vs-faze-blast-pro-series-miami-2019'
    )
    expect(response.length).toBeCloseTo(10, 5)
    expect(response).toMatchInlineSnapshot(`
          Array [
            Object {
              "adr": 70.2,
              "deaths": 36,
              "kast": 62,
              "kills": 34,
              "playerId": "/player/8520/NAF",
              "playerName": "Keith NAF Markovic",
              "plusMinus": -2,
              "rating": 0.93,
            },
            Object {
              "adr": 79.4,
              "deaths": 42,
              "kast": 54,
              "kills": 30,
              "playerId": "/player/8738/EliGE",
              "playerName": "Jonathan EliGE Jablonowski",
              "plusMinus": -12,
              "rating": 0.83,
            },
            Object {
              "adr": 62.8,
              "deaths": 37,
              "kast": 52,
              "kills": 28,
              "playerId": "/player/7687/nitr0",
              "playerName": "Nick nitr0 Cannella",
              "plusMinus": -9,
              "rating": 0.82,
            },
            Object {
              "adr": 60.8,
              "deaths": 38,
              "kast": 56,
              "kills": 24,
              "playerId": "/player/8797/Stewie2K",
              "playerName": "Jake Stewie2K Yip",
              "plusMinus": -14,
              "rating": 0.69,
            },
            Object {
              "adr": 51.4,
              "deaths": 38,
              "kast": 58,
              "kills": 17,
              "playerId": "/player/10394/Twistzz",
              "playerName": "Russel Twistzz Van Dulken",
              "plusMinus": -21,
              "rating": 0.64,
            },
            Object {
              "adr": 92.6,
              "deaths": 25,
              "kast": 78,
              "kills": 47,
              "playerId": "/player/3741/NiKo",
              "playerName": "Nikola NiKo Kovač",
              "plusMinus": 22,
              "rating": 1.53,
            },
            Object {
              "adr": 99.9,
              "deaths": 32,
              "kast": 72,
              "kills": 47,
              "playerId": "/player/8183/rain",
              "playerName": "Håvard rain Nygaard",
              "plusMinus": 15,
              "rating": 1.5,
            },
            Object {
              "adr": 73.6,
              "deaths": 26,
              "kast": 72,
              "kills": 35,
              "playerId": "/player/334/AdreN",
              "playerName": "Dauren AdreN Kystaubayev",
              "plusMinus": 9,
              "rating": 1.13,
            },
            Object {
              "adr": 73.1,
              "deaths": 27,
              "kast": 74,
              "kills": 34,
              "playerId": "/player/2757/GuardiaN",
              "playerName": "Ladislav GuardiaN Kovács",
              "plusMinus": 7,
              "rating": 1.1,
            },
            Object {
              "adr": 64.2,
              "deaths": 24,
              "kast": 78,
              "kills": 28,
              "playerId": "/player/885/olofmeister",
              "playerName": "Olof olofmeister Kajbjer",
              "plusMinus": 4,
              "rating": 1.06,
            },
          ]
        `)
  })

  it('should throw `getStatsByMatchId`', async () => {
    const err = new Error(
      'Error: Something went wrong, here is no stats found for this match. Please create an issue in this repository https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getStatsByMatchId('force-error')).rejects.toEqual(err)
  })

  it('should have stats off all matches when we call `getMatches`', async () => {
    const response = await HLTV.getMatches()
    expect(response.length).toBeGreaterThan(0)
    const result = response[0]
    expect(result.id).toBeDefined()
    expect(result.link).toBeDefined()
    expect(result.event.name).toBeDefined()
    expect(result.event.crest).toContain(CONFIG.STATIC)
    expect(result.stars).toBeDefined()
    expect(result.teams[0].name).toBeDefined()
    expect(result.teams[0].crest).toContain(CONFIG.STATIC)
    expect(result.teams[1].name).toBeDefined()
    expect(result.teams[1].crest).toContain(CONFIG.STATIC)
  })
})
