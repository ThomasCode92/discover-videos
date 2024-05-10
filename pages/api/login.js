export default async function login(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    console.log(token);
    return res.send({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
