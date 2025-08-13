import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL не передано' });
  }

  try {
    const response = await fetch(url, { redirect: 'follow' });
    res.status(200).json({ finalUrl: response.url });
  } catch {
    res.status(500).json({ error: 'Не вдалося розпізнати посилання TikTok' });
  }
}
