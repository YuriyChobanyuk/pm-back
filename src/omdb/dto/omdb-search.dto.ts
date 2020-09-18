import { IsString, IsEnum } from 'class-validator';
import { ShowType } from '../../show/show-type.enum';

export class OmdbSearchDto {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsString()
  imdbId: string;

  @IsEnum(ShowType)
  type: ShowType;
}
