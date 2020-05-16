import {
  Length,
  Matches,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { UserRole } from '../user-role.enum';

export class AddUserDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too week',
  })
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  img_path: string;
}
