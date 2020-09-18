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
import { API_V1 } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: AppConfigService,
    private jwtService: JwtService,
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
      expiresIn: this.configService.jwtConfig.expiresIn,
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

  get refreshTokenCookieOptions() {
    return {
      maxAge: this.configService.jwtConfig.refreshExpiresIn * 1000,
      expireAfterSeconds: this.configService.jwtConfig.refreshExpiresIn * 1000,
      httpOnly: false,
      // should be set to true in real production
      secure: false,
      // domain: this.configService.applicationConfig.domain,
      domain: null,
      // path: `${API_V1}/auth`,
    };
  }
}
