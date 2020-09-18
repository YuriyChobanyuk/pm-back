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
import * as jwt from 'jsonwebtoken';
import { AppConfigService } from '../app-config/app-config.service';

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
  ) {
    const user = await this.authService.signUp(signUpDto);

    return this.sendToken(res, user);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(loginDto);

    return this.sendToken(res, user);
  }

  @Get('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    let user: User;
    try {
      user = await this.authService.refresh(refreshToken);
    } catch (e) {
      return res.status(401).send('Invalid refresh token');
    }

    return this.sendToken(res, user);
  }

  private sendToken(res: Response, user: User): Response {
    const { id, name, role } = user;

    const payload: JwtPayloadInterface = {
      userId: id,
      role,
      name,
    };

    const token = this.jwtService.sign(payload, {});
    const refreshToken = this.authService.generateRefreshToken(payload);
    try {
      jwt.verify(refreshToken, this.configService.jwtConfig.refreshSecret);
    } catch (e) {
      throw new UnauthorizedException();
    }
    return res
      .cookie(
        'refreshToken',
        refreshToken,
        this.authService.refreshTokenCookieOptions,
      )
      .status(200)
      .json({
        token,
        data: {
          user: plainToClass(User, user),
        },
      });
  }
}
