import jwt from 'jsonwebtoken';

import { findStatsByUserAndVideoId } from '@/lib/hasura';

export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    const videoId = req.query.videoId;

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;

    const stats = await findStatsByUserAndVideoId(token, userId, videoId);
    console.log('stats', stats);

    if (stats) return res.send({ message: 'Stats updated' });

    return res.status(201).send({ message: 'Stats created' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
