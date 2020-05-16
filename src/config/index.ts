import { config } from 'dotenv';
config();

export const appConf = {
  DB_NAME: process.env.db_name,
  DB_USERNAME: process.env.db_username,
  DB_PASSWORD: process.env.db_password,
  DB_PORT: parseInt(process.env.db_port),
  DB_HOST: process.env.db_host,
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.port),
};
