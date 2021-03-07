import { ShowType } from '../../show/show-type.enum';
import { Expose, Transform, Type } from 'class-transformer';

export class OmdbShowResponseDto {
  @Expose({ name: 'title', toPlainOnly: true })
  Title: string;

  @Expose({ name: 'year', toPlainOnly: true })
  Year: string;

  @Expose({ name: 'released', toPlainOnly: true })
  @Type(() => Date)
  Released: string;

  @Expose({ name: 'genre', toPlainOnly: true })
  @Transform(
    ({ value }) => {
      return value ? value.split(', ') : [];
    },
    { toClassOnly: true },
  )
  Genre: string;

  @Expose({ name: 'director', toPlainOnly: true })
  Director: string;

  @Expose({ name: 'poster', toPlainOnly: true })
  Poster: string;

  @Expose()
  @Transform(
    ({ value }) => {
      if (!value || !Number.isNaN(parseInt(value))) {
        return -1;
      }
      return +value;
    },
    {
      toPlainOnly: true,
    },
  )
  imdbRating: string;

  @Expose({ name: 'imdbId', toPlainOnly: true })
  imdbID: string;

  @Expose({ name: 'type', toPlainOnly: true })
  Type: ShowType;

  @Expose()
  @Type(() => Number)
  totalSeasons?: string; // series only

  imdbVotes: string;
  Runtime: string;
  Rated: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Metascore: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}
