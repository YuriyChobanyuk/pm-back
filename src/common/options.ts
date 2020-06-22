import { appConf } from '../config';
import { API_V1 } from './constants';

export const refreshTokenCookieOptions = {
  maxAge: appConf.JWT_REFRESH_EXPIRES_IN * 1000,
  expireAfterSeconds: appConf.JWT_REFRESH_EXPIRES_IN * 1000,
  httpOnly: true,
  // should be set to true in real production
  secure: false,
  domain: '127.0.0.1',
  path: `${API_V1}/auth`,
};
