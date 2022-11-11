import HLTV from '../src'
import { CONFIG } from '../src/config'
import { getNews } from '../src/rss'

describe('hltv-api', () => {
  beforeEach(() => {
    CONFIG.RESULTS = 'results'
    CONFIG.MATCHES = 'matches'
    CONFIG.PLAYERS = 'stats/players'
    CONFIG.TEAMS = 'ranking/teams'
  })
  it('should response with 10 news when we call `getNews`', async () => {
    const response = await HLTV.getNews()
    expect(response.length).toEqual(10)
  })

  it('should have all details when we call `getNews`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getNews()
    const news = response[0]
    expect(news.title.length).toBeGreaterThan(3)
    expect(news.description).toBeDefined()
    expect(news.link).toContain(CONFIG.BASE)
    expect(news.time).toBeDefined()
  })

  it('should have all details when we call `getResults`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getResults()
    expect(response.length).toBeDefined()
    const result = response[0]
    expect(result.time).toBeDefined()
    expect(result.teams[0].name).toBeDefined()
    expect(result.teams[0].logo).toBeDefined()
    expect(result.teams[1].name).toBeDefined()
    expect(result.teams[1].logo).toBeDefined()
    expect(result.matchId).toBeDefined()
  })

  it('should throw `getResults`', async () => {
    expect.hasAssertions()
    CONFIG.RESULTS = '/results_FAIL'
    const err = new Error(
      'Error: There are no results available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getResults()).rejects.toEqual(err)
  })

  it('should have match stats when we call `getMatches`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getMatchById(2332210)
    expect(response).toMatchInlineSnapshot(`
      {
        "event": {
          "logo": "",
          "name": "BLAST Pro Series Miami 2019",
        },
        "id": 2332210,
        "maps": [
          {
            "name": "Mirage",
            "pick": "FaZe",
            "teams": [
              {
                "name": "Liquid",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 5,
                    "side": "ct",
                  },
                  "second": {
                    "rounds": 1,
                    "side": "t",
                  },
                },
              },
              {
                "name": "FaZe",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 10,
                    "side": "t",
                  },
                  "second": {
                    "rounds": 6,
                    "side": "ct",
                  },
                },
              },
            ],
          },
          {
            "name": "Dust2",
            "pick": "Liquid",
            "teams": [
              {
                "name": "Liquid",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 3,
                    "side": "t",
                  },
                  "second": {
                    "rounds": 9,
                    "side": "ct",
                  },
                },
              },
              {
                "name": "FaZe",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 12,
                    "side": "ct",
                  },
                  "second": {
                    "rounds": 4,
                    "side": "t",
                  },
                },
              },
            ],
          },
          {
            "name": "Overpass",
            "pick": "",
            "teams": [
              {
                "name": "Liquid",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 0,
                    "side": undefined,
                  },
                  "second": {
                    "rounds": 0,
                    "side": undefined,
                  },
                },
              },
              {
                "name": "FaZe",
                "result": {
                  "ext": 0,
                  "first": {
                    "rounds": 0,
                    "side": undefined,
                  },
                  "second": {
                    "rounds": 0,
                    "side": undefined,
                  },
                },
              },
            ],
          },
        ],
        "teams": [
          {
            "logo": "https://img-cdn.hltv.org/teamlogo/JMeLLbWKCIEJrmfPaqOz4O.svg?ixlib=java-2.1.0&s=c02caf90234d3a3ebac074c84ba1ea62",
            "name": "Liquid",
            "players": [
              {
                "adr": 70.2,
                "deaths": 36,
                "id": 8520,
                "kast": 62,
                "kills": 34,
                "name": "Keith Markovic",
                "nickname": "NAF",
                "rating": 0.93,
              },
              {
                "adr": 79.4,
                "deaths": 42,
                "id": 8738,
                "kast": 54,
                "kills": 30,
                "name": "Jonathan Jablonowski",
                "nickname": "EliGE",
                "rating": 0.83,
              },
              {
                "adr": 62.8,
                "deaths": 37,
                "id": 7687,
                "kast": 52,
                "kills": 28,
                "name": "Nick Cannella",
                "nickname": "nitr0",
                "rating": 0.82,
              },
              {
                "adr": 60.8,
                "deaths": 38,
                "id": 8797,
                "kast": 56,
                "kills": 24,
                "name": "Jake Yip",
                "nickname": "Stewie2K",
                "rating": 0.69,
              },
              {
                "adr": 51.4,
                "deaths": 38,
                "id": 10394,
                "kast": 58,
                "kills": 17,
                "name": "Russel Van Dulken",
                "nickname": "Twistzz",
                "rating": 0.64,
              },
            ],
            "result": 0,
          },
          {
            "logo": "https://img-cdn.hltv.org/teamlogo/SMhzsxzbkIrgqCOOKGRXlW.svg?ixlib=java-2.1.0&s=e6a9ce0345c7d703e5eaac14307f69aa",
            "name": "FaZe",
            "players": [
              {
                "adr": 92.6,
                "deaths": 25,
                "id": 3741,
                "kast": 78,
                "kills": 47,
                "name": "Nikola  Kovač",
                "nickname": "NiKo",
                "rating": 1.53,
              },
              {
                "adr": 99.9,
                "deaths": 32,
                "id": 8183,
                "kast": 72,
                "kills": 47,
                "name": "Håvard  Nygaard",
                "nickname": "rain",
                "rating": 1.5,
              },
              {
                "adr": 73.6,
                "deaths": 26,
                "id": 334,
                "kast": 72,
                "kills": 35,
                "name": "Dauren  Kystaubayev",
                "nickname": "AdreN",
                "rating": 1.13,
              },
              {
                "adr": 73.1,
                "deaths": 27,
                "id": 2757,
                "kast": 74,
                "kills": 34,
                "name": "Ladislav  Kovács",
                "nickname": "GuardiaN",
                "rating": 1.1,
              },
              {
                "adr": 64.2,
                "deaths": 24,
                "id": 885,
                "kast": 78,
                "kills": 28,
                "name": "Olof  Kajbjer",
                "nickname": "olofmeister",
                "rating": 1.06,
              },
            ],
            "result": 2,
          },
        ],
        "time": "2019-04-13T21:25:00.000Z",
      }
    `)
  })

  it('should throw `getMatches`', async () => {
    expect.hasAssertions()
    CONFIG.MATCHES = '/matches_FAIL'
    const err = new Error(
      'Error: There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getMatches()).rejects.toEqual(err)
  })

  it('should throw `getMatchById`', async () => {
    expect.hasAssertions()
    const err = new Error(
      'Error: Something went wrong, here is no correct stats found for this match. Please create an issue in this repository https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getMatchById(0)).rejects.toEqual(err)
  })

  it('should have stats of all matches when we call `getMatches`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getMatches()
    expect(response.length).toBeGreaterThan(0)
    const result = response[0]
    expect(result.id).toBeDefined()
    expect(result.event.name).toBeDefined()
    expect(result.event.logo).toContain(CONFIG.CDN)
    expect(result.stars).toBeDefined()
    expect(result.teams[0].name).toBeDefined()
    expect(result.teams[1].name).toBeDefined()
    if (result.teams[0].logo && !result.teams[0].logo.includes('placeholder.svg')) {
      expect(result.teams[0].logo).toContain(CONFIG.CDN)
    }
    if (result.teams[1].logo && !result.teams[1].logo.includes('placeholder.svg')) {
      expect(result.teams[1].logo).toContain(CONFIG.CDN)
    }
  })

  it('should have stats of all matches when we call `getMatches` passing eventId', async () => {
    expect.hasAssertions()
    const response = await HLTV.getMatches(6586)
    expect(response.length).toBeGreaterThan(0)
    const result = response[0]
    expect(result.id).toBeDefined()
    expect(result.event.name).toBeDefined()
    expect(result.event.logo).toContain(CONFIG.CDN)
    expect(result.stars).toBeDefined()
    expect(result.teams[0].name).toBeDefined()
    expect(result.teams[1].name).toBeDefined()
    if (result.teams[0].logo && !result.teams[0].logo.includes('placeholder.svg')) {
      expect(result.teams[0].logo).toContain(CONFIG.CDN)
    }
    if (result.teams[1].logo && !result.teams[1].logo.includes('placeholder.svg')) {
      expect(result.teams[1].logo).toContain(CONFIG.CDN)
    }
  })

  it('should throw when `getMatches` is invoked with an eventId that does not exists', async () => {
    const err = new Error(
      'Error: There are no matches available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getMatches(0)).rejects.toEqual(err)
  })

  it('should have info of all players when we call `getTopPlayers`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getTopPlayers()
    expect(response.length).toBeGreaterThan(0)
    const result = response[0]

    expect(result.id).toBeDefined()
    expect(result.slug).toBeDefined()
    expect(result.nickname).toBeDefined()
    expect(result.kd).toBeDefined()
    expect(result.mapsPlayed).toBeDefined()
    expect(result.rating).toBeDefined()
    expect(result.team).toBeDefined()
  })

  it('should throw `getTopPlayers`', async () => {
    expect.hasAssertions()
    CONFIG.PLAYERS = '/players_FAIL'
    const err = new Error(
      'Error: There are no players available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getTopPlayers()).rejects.toEqual(err)
  })

  it('should have info of the player when we call `getPlayerById`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getPlayerById(11893)
    const result = response

    expect(result.team).toBeDefined()
    expect(result.image).toBeDefined()
    expect(result.nickname).toBeDefined()
    expect(result.age).toBeDefined()
    expect(result.rating).toBeDefined()
    expect(result.impact).toBeDefined()
    expect(result.dpr).toBeDefined()
    expect(result.adr).toBeDefined()
    expect(result.kast).toBeDefined()
    expect(result.kpr).toBeDefined()
    expect(result.headshots).toBeDefined()
    expect(result.mapsPlayed).toBeDefined()
  })

  it('should have info of the player when we call `getPlayerById`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getPlayerById(5839)
    const result = response

    expect(result.team).toBeDefined()
    expect(result.image).toBeDefined()
    expect(result.nickname).toBeDefined()
    expect(result.age).toBeDefined()
    expect(result.rating).toBeDefined()
    expect(result.impact).toBeDefined()
    expect(result.dpr).toBeDefined()
    expect(result.adr).toBeDefined()
    expect(result.kast).toBeDefined()
    expect(result.kpr).toBeDefined()
    expect(result.headshots).toBeDefined()
    expect(result.mapsPlayed).toBeDefined()
  })

  it('should throw `getPlayerById`', async () => {
    expect.hasAssertions()
    CONFIG.PLAYERS = '/players_FAIL'
    const err = new Error(
      'Error: There is no player available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getPlayerById(11893)).rejects.toEqual(err)
  })

  it('should have info of all top ranked teams when we call `getTopTeams`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getTopTeams()
    expect(response.length).toBeGreaterThan(0)
    const result = response[0]

    expect(result.id).toBeDefined()
    expect(result.logo).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.ranking).toBeDefined()
    expect(result.players.length).toBeGreaterThan(0)
  })

  it('should throw `getTopTeams`', async () => {
    expect.hasAssertions()
    CONFIG.TEAMS = '/teams_FAIL'
    const err = new Error(
      'Error: There are no teams available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getTopTeams()).rejects.toEqual(err)
  })

  it('should have info of the team when we call `getTeamById`', async () => {
    expect.hasAssertions()
    const response = await HLTV.getTeamById(4608)
    const result = response

    expect(result.id).toBeDefined()
    expect(result.averagePlayerAge).toBeDefined()
    expect(result.coach).toBeDefined()
    expect(result.logo).toBeDefined()
    expect(result.name).toBeDefined()
    expect(result.ranking).toBeDefined()
    expect(result.players.length).toBeGreaterThan(0)
  })

  it('should throw `getTeamById`', async () => {
    expect.hasAssertions()
    CONFIG.TEAM = 'team_FAIL'
    const err = new Error(
      'Error: There is no team available, something went wrong. Please contact the library maintainer on https://github.com/dajk/hltv-api'
    )
    await expect(HLTV.getTeamById(0)).rejects.toEqual(err)
  })
})
