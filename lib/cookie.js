import cookie from 'cookie';

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week, in seconds

export function setTokenCookie(token, response) {
  const options = {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
  };

  const setCookie = cookie.serialize('token', token, options);

  response.setHeader('Set-Cookie', setCookie);
}

export function removeTokenCookie(response) {
  const options = { maxAge: -1, path: '/' };
  const setCookie = cookie.serialize('token', '', options);

  response.setHeader('Set-Cookie', setCookie);
}
