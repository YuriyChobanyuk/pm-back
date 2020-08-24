import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AppConfigService } from 'src/app-config/app-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    configService: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const { userId } = payload;

    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
