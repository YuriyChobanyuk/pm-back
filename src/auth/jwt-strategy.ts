import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { appConf } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConf.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    console.log('verify');
    const { userId } = payload;

    const user = this.userService.getUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
