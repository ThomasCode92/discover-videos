import { magicAdmin } from '@/lib/magic-admin';

export default async function login(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const auth = req.headers.authorization;
    const didToken = auth.split(' ')[1];

    const metadata = await magicAdmin.users.getMetadataByToken(didToken);
    console.log('metadata', metadata);

    return res.send({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
