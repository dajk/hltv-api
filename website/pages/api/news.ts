// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import HLTV from 'hltv-api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const news = await HLTV.getNews()
  res.status(200).json(news)
}
