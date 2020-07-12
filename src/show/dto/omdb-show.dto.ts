import { IsString, IsDate, IsUrl, IsNumber } from 'class-validator';

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

  @IsString()
  type: string;

  @IsNumber()
  totalSeasons: number;
}
