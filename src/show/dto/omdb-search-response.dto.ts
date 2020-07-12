import { ShowType } from './../show-type.enum';
import { Expose, Transform, plainToClass } from 'class-transformer';

export class OmdbSearchResultDto {
  @Expose({ name: 'title', toPlainOnly: true })
  Title: string;

  @Expose({ name: 'year', toPlainOnly: true })
  Year: string;

  @Expose({ name: 'imdbId', toPlainOnly: true })
  imdbID: string;

  @Expose({ name: 'type', toPlainOnly: true })
  Type: ShowType;

  Poster: string;
}

export class OmdbSearchResponseDto {
  @Transform(value => plainToClass(OmdbSearchResultDto, value), {
    toClassOnly: true,
  })
  Search: OmdbSearchResultDto[];
}
