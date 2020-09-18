import { ShowType } from '../../show/show-type.enum';
import { IsString, IsOptional, IsEnum } from 'class-validator';

// at least one "i" or "t" is required
export class OmdbGetByIdQueryDto {
  // imdb id
  @IsString()
  @IsOptional()
  i?: string;

  // show title
  @IsString()
  @IsOptional()
  t?: string;

  // year
  @IsString()
  @IsOptional()
  y?: string;

  @IsEnum(ShowType)
  @IsOptional()
  type?: ShowType;
}
