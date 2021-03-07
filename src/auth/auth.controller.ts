import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';
import { AppConfigService } from '../app-config/app-config.service';
import { IAuthResponse } from './auth-response.interface';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
    @Res() res: Response,
  ): Promise<IAuthResponse> {
    const user = await this.authService.signUp(signUpDto);

    return this.sendUser(res, user);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<IAuthResponse> {
    const user = await this.authService.login(loginDto);

    return this.sendUser(res, user);
  }

  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAuthResponse> {
    const refreshToken = req.cookies['refreshToken'];
    const authToken = req.headers.authorization;

    if (!refreshToken || !authToken) {
      throw new UnauthorizedException();
    }

    try {
      this.authService.verifyExpiredAuthToken(authToken);
    } catch (e) {
      throw new UnauthorizedException('Invalid access token');
    }
    try {
      const user = await this.authService.refresh(refreshToken);
      return this.sendUser(res, user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private sendUser(res: Response, user: User): IAuthResponse {
    const { id, name, role } = user;

    const payload: JwtPayloadInterface = {
      userId: id,
      role,
      name,
    };

    const token = this.jwtService.sign(payload);

    this.setRefreshTokenCookie(res, payload);

    return {
      token,
      data: {
        user: plainToClass(User, user),
      },
    };
  }

  private setRefreshTokenCookie(
    res: Response,
    payload: JwtPayloadInterface,
  ): void {
    const refreshToken = this.authService.generateRefreshToken(payload);

    res.cookie(
      'refreshToken',
      refreshToken,
      this.authService.refreshTokenCookieOptions,
    );
  }
}
