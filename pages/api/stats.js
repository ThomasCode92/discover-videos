export default async function stats(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  return res.send({ message: 'Stats updated' });
}
