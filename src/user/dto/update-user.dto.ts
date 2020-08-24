import {
  Length,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsString()
  @Length(2, 50)
  name: string | undefined;

  @IsEmail()
  email: string | undefined;

  @IsOptional()
  img_path: string | undefined;
}
