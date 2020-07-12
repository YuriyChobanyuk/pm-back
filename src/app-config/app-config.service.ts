import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigRootType } from './configuration';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get rootConfig(): ApplicationConfigRootType {
    return this.configService.get('app');
  }

  get databaseConfig() {
    return this.rootConfig.database;
  }

  get jwtConfig() {
    return this.rootConfig.jwt;
  }

  get applicationConfig() {
    return this.rootConfig.application;
  }

  get omdbConfig() {
    return this.rootConfig.omdb;
  }
}
