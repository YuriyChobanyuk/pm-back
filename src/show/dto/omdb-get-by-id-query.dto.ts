import { ShowType } from './../show-type.enum';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class OmdbGetByIdQueryDto {
  @IsString()
  @IsOptional()
  i?: string;

  @IsString()
  @IsOptional()
  t?: string;

  @IsString()
  @IsOptional()
  y?: string;

  @IsEnum(ShowType)
  @IsOptional()
  type?: ShowType;
}
