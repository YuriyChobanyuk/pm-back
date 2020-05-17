import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { appConf } from '../config';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: appConf.JWT_SECRET,
      signOptions: {
        expiresIn: appConf.JWT_EXPIRES_IN,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
