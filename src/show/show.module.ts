import { AppConfigModule } from './../app-config/app-config.module';
import { Module, HttpModule } from '@nestjs/common';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';

@Module({
  controllers: [ShowController],
  providers: [ShowService],
  imports: [HttpModule, AppConfigModule],
})
export class ShowModule {}
