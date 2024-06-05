import {
  addStatsForUserAndVideoId,
  findStatsByUserAndVideoId,
  updateStatsForUserAndVideoId,
} from '@/lib/hasura';
import verifyToken from '@/utils/verify-token';

export default async function stats(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    const videoId = req.query.videoId;

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const userId = verifyToken(token);
    const stats = await findStatsByUserAndVideoId(token, userId, videoId);

    if (req.method === 'GET') {
      if (!stats) return res.status(404).send({ message: 'Stats not found' });
      return res.send({ message: 'Stats found', data: stats });
    }

    const { watched, favoured } = req.body;
    const data = { watched, favoured };

    if (stats) {
      const updatedStats = await updateStatsForUserAndVideoId(
        token,
        userId,
        videoId,
        data
      );

      return res.send({ message: 'Stats updated', data: updatedStats });
    }

    const createdStats = await addStatsForUserAndVideoId(
      token,
      userId,
      videoId,
      data
    );

    return res
      .status(201)
      .send({ message: 'Stats created', data: createdStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
