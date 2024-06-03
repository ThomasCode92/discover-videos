import jwt from 'jsonwebtoken';

import {
  addStatsForUserId,
  findStatsByUserAndVideoId,
  updateStatsForUserId,
} from '@/lib/hasura';

export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    const videoId = req.query.videoId;
    const { watched, favoured } = req.body;

    const data = { watched, favoured };

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.issuer;

    const stats = await findStatsByUserAndVideoId(token, userId, videoId);

    if (stats) {
      const updatedStats = await updateStatsForUserId(
        token,
        userId,
        videoId,
        data
      );

      return res.send({ message: 'Stats updated', data: updatedStats });
    }

    const createdStats = await addStatsForUserId(token, userId, videoId, data);

    return res
      .status(201)
      .send({ message: 'Stats created', data: createdStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
