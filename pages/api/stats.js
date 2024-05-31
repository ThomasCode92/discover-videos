import jwt from 'jsonwebtoken';

import { findStatsByUserAndVideoId } from '@/lib/hasura';

export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.issuer;
    const videoId = '4zH5iYM4wJo';

    const stats = await findStatsByUserAndVideoId(token, userId, videoId);
    console.log('stats', stats);

    return res.send({ message: 'Stats updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
