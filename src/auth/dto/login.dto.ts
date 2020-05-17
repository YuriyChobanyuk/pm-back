import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { PASSWORD_REG_EXP } from '../../common/constants';

export class LoginDto {

  @IsString()
  @Length(8, 50)
  @Matches(PASSWORD_REG_EXP, {
    message: 'password is too week',
  })
  password: string;

  @IsEmail()
  email: string;
}
