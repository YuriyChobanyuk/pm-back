import {
  IsString,
  IsDate,
  IsUrl,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ShowType } from '../../show/show-type.enum';
import { ShowStatus } from '../../show/show-status.enum';

export class OmdbShowDto {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsDate()
  released: Date;

  @IsString({
    each: true,
  })
  genre: string[];

  @IsString()
  director: string;

  @IsString({
    each: true,
  })
  actors: string[];

  @IsUrl()
  poster: string;

  @IsNumber()
  imdbRating: number;

  @IsString()
  imdbId: string;

  @IsEnum(ShowType)
  type: ShowType;

  @IsNumber()
  @IsOptional()
  totalSeasons?: number;

  @IsEnum(ShowStatus)
  status: string;
}
