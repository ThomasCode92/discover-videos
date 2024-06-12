import { removeTokenCookie } from '@/lib/cookie';
import { magicAdmin } from '@/lib/magic-admin';
import verifyToken from '@/utils/verify-token';

export default async function logout(req, res) {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).send({ message: 'User is not logged in' });

    const userId = await verifyToken(token);
    removeTokenCookie(res);

    await magicAdmin.users.logoutByIssuer(userId);

    return res.status(200).send({ message: 'User logged out' });
  } catch (error) {
    console.error({ error });
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
