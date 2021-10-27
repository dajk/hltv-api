import fetch from 'node-fetch'
import xml2js from 'xml2js'
import { CONFIG } from './config'

function validateXML(xml: string) {
  return xml.slice(0, 5) === `<?xml`
}

/**
 * Available RSS links
 */
export default async function getRSS(type: 'news') {
  const url = `${CONFIG.BASE}/${CONFIG.RSS}/${type}`

  try {
    const xml = await (
      await fetch(url, {
        headers: { 'User-Agent': 'node-fetch' },
      })
    ).text()
    const parser = new xml2js.Parser()

    if (!validateXML(xml)) {
      throw new Error('Invalid XML')
    }

    const result = await parser.parseStringPromise(xml)

    const { length } = result.rss.channel[0].item
    const rss = []

    for (let i = 0; i < length; i += 1) {
      const obj = {
        title: result.rss.channel[0].item[i].title[0],
        description: result.rss.channel[0].item[i].description[0],
        link: result.rss.channel[0].item[i].link[0],
        time: new Date(result.rss.channel[0].item[i].pubDate[0]).toISOString(),
      }

      rss.push(obj)
    }

    return rss
  } catch (error) {
    throw new Error(error as any)
  }
}
