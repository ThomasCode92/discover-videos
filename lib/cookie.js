import cookie from 'cookie';

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week, in seconds

export function setTokenCookie(token) {
  const options = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
  };

  cookie.serialize('token', token, options);
}
