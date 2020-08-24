import {
  IsDateString,
  IsString,
  IsUrl,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ShowType } from '../show-type.enum';

export class AddShowDto {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsDateString()
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
}
