import { get } from 'request'
import { parseString } from 'xml2js'
import { CONFIG } from './config'

/**
 * Available RSS links
 *
 * @export
 * @class RSS
 */
export default class RSS {
  /**
   * Creates an instance of RSS.
   *
   * @param {string} type
   * @param {any} callback
   *
   * @memberOf RSS
   */
  constructor(type: string, callback: any) {
    const URL = `/${type}`
    const uri = `${CONFIG.BASE}${CONFIG.RSS}${URL}`

    get({ uri }, (error, response, body) => {
      parseString(body, (err, result) => {
        const { length } = result.rss.channel[0].item
        const rss = []

        for (let i = 0; i < length; i += 1) {
          const obj = {
            title: result.rss.channel[0].item[i].title[0],
            description: result.rss.channel[0].item[i].description[0],
            link: result.rss.channel[0].item[i].link[0],
            date: result.rss.channel[0].item[i].pubDate[0],
          }

          rss.push(obj)
        }

        callback(rss, err)
      })
    })
  }
}
