import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { plainToClass } from 'class-transformer';
import { UserRole } from '../user/user-role.enum';
import { AddUserDto } from '../user/dto/add-user.dto';
import { User } from '../user/user.entity';
import { JwtPayloadInterface } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { appConf } from '../config';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
    return jwt.sign(payload, appConf.JWT_REFRESH_SECRET, {
      expiresIn: appConf.JWT_REFRESH_EXPIRES_IN,
    });
  }

  verifyRefreshToken(refreshToken: string): JwtPayloadInterface {
    try {
      jwt.verify(refreshToken, appConf.JWT_REFRESH_SECRET);
    } catch (e) {
      throw new UnauthorizedException();
    }

    return jwt.decode(refreshToken) as JwtPayloadInterface;
  }
}
