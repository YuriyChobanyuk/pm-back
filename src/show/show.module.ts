import { ShowRepository } from './show.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { Module } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { OmdbModule } from '../omdb/omdb.module';

@Module({
  controllers: [ShowController],
  providers: [ShowService],
  imports: [
    AppConfigModule,
    TypeOrmModule.forFeature([ShowRepository]),
    OmdbModule
  ],
})
export class ShowModule {}
