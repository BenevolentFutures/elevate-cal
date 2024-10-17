import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';

export async function getSessionUserId(req) {
  const { cookie } = req.headers;
  if (!cookie) return null;

  const { token } = parse(cookie);
  if (!token) return null;

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}
