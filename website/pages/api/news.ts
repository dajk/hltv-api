// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import HLTV from '../../../dist/index.js'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const news = await HLTV.getNews()
  res.status(200).json(news)
}
