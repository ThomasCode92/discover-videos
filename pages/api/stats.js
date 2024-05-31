export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    if (!req.cookies.token)
      return res.status(401).send({ message: 'Unauthorized' });

    return res.send({ message: 'Stats updated' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
