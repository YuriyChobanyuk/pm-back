import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { ShowModule } from './show/show.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AppConfigService } from './app-config/app-config.service';
import { getDBConfig } from './common/db-config';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => {
        console.log(configService.databaseConfig);
        return getDBConfig(configService.databaseConfig);
      },
      inject: [AppConfigService],
    }),
    UserModule,
    AuthModule,
    NotesModule,
    ShowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
