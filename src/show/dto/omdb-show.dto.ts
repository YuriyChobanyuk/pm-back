import {
  IsString,
  IsDate,
  IsUrl,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ShowType } from '../show-type.enum';

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

  @IsString()
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
}
