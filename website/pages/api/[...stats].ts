// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import HLTV from '../../../dist/index.js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = Array.isArray(req.query.stats)
    ? req.query.stats.join('/')
    : req.query.stats
  const stats = await HLTV.getStatsByMatchId(query)
  res.status(200).json(stats)
}
