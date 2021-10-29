import express from 'express'
import HLTV from '../../dist/index.js'
import makeEndpoints from '../endpoints.js'

const app = express()

makeEndpoints(app, HLTV)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listening with-babel on port http://localhost:${PORT} ...`)
})
