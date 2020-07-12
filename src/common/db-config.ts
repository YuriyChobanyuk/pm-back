import { appConf } from '../app-config/configuration';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const { database } = appConf;
export const getDBConfig = (
  credentials: typeof database,
): TypeOrmModuleOptions => ({
  ...credentials,
  type: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
