import jwt from 'jsonwebtoken';

import { setTokenCookie } from '@/lib/cookie';
import { createNewUser, getUserByDid } from '@/lib/hasura';
import { magicAdmin } from '@/lib/magic-admin';

export default async function login(req, res) {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Method not allowed' });

  try {
    const auth = req.headers.authorization;
    const didToken = auth.split(' ')[1];

    const metadata = await magicAdmin.users.getMetadataByToken(didToken);

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
      process.env.JWT_SECRET
    );

    const user = await getUserByDid(token, metadata.issuer);
    const isNewUser = !user;

    if (isNewUser) {
      await createNewUser(token, metadata);
    }

    setTokenCookie(token, res);

    return res.send({ message: 'Login successful', data: { isNewUser } });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
