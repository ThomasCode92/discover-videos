import jwt from 'jsonwebtoken';

export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded', decoded);

    return res.send({ message: 'Stats updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
