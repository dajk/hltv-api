import * as fs from 'fs'
import { getHotMatches } from './index'

getHotMatches(dat => {
  let returnString = ''

  dat.map((value: any) => {
    returnString += JSON.stringify(value)
    return true
  })
  fs.writeFile('test.json', returnString, () => {})
})
