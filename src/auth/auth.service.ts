import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { plainToClass } from 'class-transformer';
import { UserRole } from '../user/user-role.enum';
import { AddUserDto } from '../user/dto/add-user.dto';
import { User } from '../user/user.entity';
import { JwtPayloadInterface } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { AppConfigService } from 'src/app-config/app-config.service';
import ms from 'ms';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: AppConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const addUserDto = plainToClass(AddUserDto, {
      ...signUpDto,
      role: UserRole.USER, // set role to user by default
    });

    return await this.userService.addUser(addUserDto);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.comparePasswords(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async refresh(refreshToken: string): Promise<User> {
    const payload = this.verifyRefreshToken(refreshToken);

    return this.userService.getUser(payload.userId);
  }

  private async comparePasswords(loginDto: LoginDto): Promise<User | null> {
    const { email, password } = loginDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    let same: boolean;
    try {
      same = await bcrypt.compare(password, user.password);
    } catch (err) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return same ? user : null;
  }

  generateRefreshToken(payload: JwtPayloadInterface): string {
    return jwt.sign(payload, this.configService.jwtConfig.refreshSecret, {
      expiresIn: this.configService.jwtConfig.refreshExpiresIn,
    });
  }

  verifyRefreshToken(refreshToken: string): JwtPayloadInterface {
    try {
      jwt.verify(refreshToken, this.configService.jwtConfig.refreshSecret);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return jwt.decode(refreshToken) as JwtPayloadInterface;
  }

  verifyExpiredAuthToken(authToken: string): void {
    const parsedToken = this.parseBearerToken(authToken);

    jwt.verify(parsedToken, this.configService.jwtConfig.secret, {
      ignoreExpiration: true,
    });
  }

  parseBearerToken(token: string): string {
    return token.split(' ')[1];
  }

  get refreshTokenCookieOptions(): CookieOptions {
    const maxAge = ms(this.configService.jwtConfig.refreshExpiresIn);
    const expireAfterMilliseconds = ms(
      this.configService.jwtConfig.refreshExpiresIn,
    );

    return {
      maxAge,
      expires: new Date(Date.now() + expireAfterMilliseconds),
      httpOnly: false,
      // should be set to true in real production
      secure: false,
      // domain: this.configService.applicationConfig.domain,
      domain: null,
      // path: `${API_V1}/auth`,
    };
  }
}
