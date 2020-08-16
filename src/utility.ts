import cheerio from 'cheerio'

/**
 * Converting the selected elemnt in an Cherrio Array
 *
 * @export
 * @param {Cheerio} elements
 * @returns {Cheerio[]}
 */
export function toArray(elements: Cheerio): Cheerio[] {
  return elements.toArray().map(cheerio)
}
