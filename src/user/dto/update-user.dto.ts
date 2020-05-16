import {
  Length,
  Matches,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  name: string | undefined;

  @IsOptional()
  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too week',
  })
  password: string | undefined;

  @IsOptional()
  @IsEmail()
  email: string | undefined;

  @IsOptional()
  img_path: string | undefined;
}
