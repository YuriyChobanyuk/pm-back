import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { appConf } from './index';

const { DB_PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = appConf;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
