import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ShowType } from '../../show/show-type.enum';

export class OmdbSearchQueryDto {
  // search pattern
  @IsString()
  s: string;

  @IsEnum(ShowType)
  @IsOptional()
  type?: ShowType;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  page?: number;

  // year
  @IsString()
  @IsOptional()
  y?: string;
}
