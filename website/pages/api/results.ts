// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HLTV from 'hltv-api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const results = await HLTV.getResults()
  res.status(200).json(results)
}
