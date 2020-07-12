import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';
config();

export const appConf = {
  database: {
    database: process.env.db_name,
    username: process.env.db_username,
    password: process.env.db_password,
    port: parseInt(process.env.db_port),
    host: process.env.db_host,
  },
  application: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.port) ?? 4000,
    domain: process.env.DOMAIN || '127.0.0.1',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  omdb: {
    apiKey: process.env.OMDB_API_KEY,
  },
};

export type ApplicationConfigRootType = typeof appConf;

export const configuration = registerAs('app', () => appConf);
