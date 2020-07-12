import { IsString } from 'class-validator';

export class OmdbSearchDto {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsString()
  imdbId: string;

  @IsString()
  type: string;
}
