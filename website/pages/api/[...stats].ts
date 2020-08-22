// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HLTV from 'hltv-api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = Array.isArray(req.query.stats)
    ? req.query.stats.join('/')
    : req.query.stats
  const stats = await HLTV.getStatsByMatchId(query)
  res.status(200).json(stats)
}
