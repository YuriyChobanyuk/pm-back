import { HttpModule, Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { OmdbController } from './omdb.controller';
import { AppConfigModule } from '../app-config/app-config.module';

@Module({
  providers: [OmdbService],
  controllers: [OmdbController],
  imports: [HttpModule, AppConfigModule],
})
export class OmdbModule {}
