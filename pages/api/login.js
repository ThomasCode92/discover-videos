import jwt from 'jsonwebtoken';

import { magicAdmin } from '@/lib/magic-admin';

export default async function login(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const auth = req.headers.authorization;
    const didToken = auth.split(' ')[1];

    // invoke magic
    const metadata = await magicAdmin.users.getMetadataByToken(didToken);
    console.log('metadata', metadata);

    // create jwt
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      {
        iat: nowInSeconds,
        exp: nowInSeconds + 60 * 60 * 24 * 7, // 1 week
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': ['user', 'admin'],
          'x-hasura-default-role': 'user',
          'x-hasura-user-id': metadata.issuer,
        },
      },
      process.env.JWT_PRIVATE_KEY
    );
    console.log('token', token);

    return res.send({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
