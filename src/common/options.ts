import { appConf } from '../config';
import { API_V1 } from './constants';

export const refreshTokenCookieOptions = {
  maxAge: appConf.JWT_REFRESH_EXPIRES_IN,
  expireAfterSeconds: appConf.JWT_REFRESH_EXPIRES_IN,
  httpOnly: true,
  // should be set to true in real production
  secure: false,
  domain: appConf.DOMAIN,
  path: `${API_V1}/auth`
}
