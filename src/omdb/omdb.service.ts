import {
  HttpService,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { OmdbSearchQueryDto } from '../show/dto/omdb-search-query.dto';
import { OmdbSearchDto } from '../show/dto/omdb-search.dto';
import { OmdbGetByIdQueryDto } from '../show/dto/omdb-get-by-id-query.dto';
import { OmdbShowDto } from '../show/dto/omdb-show.dto';
import { OMDB_API_URL } from '../common/constants';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';
import { OmdbShowResponseDto } from '../show/dto/omdb-show-response.dto';
import { OmdbSearchResponseDto } from '../show/dto/omdb-search-response.dto';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class OmdbService {
  constructor(
    private httpService: HttpService,
    private configService: AppConfigService,
  ) {}

  public async performGetShowByIdRequest(
    getByIdQuery: OmdbGetByIdQueryDto,
  ): Promise<OmdbShowDto> {
    let omdbShow: OmdbShowDto;
    try {
      omdbShow = await this.httpService
        .get(OMDB_API_URL, {
          params: {
            apiKey: this.configService.omdbConfig.apiKey,
            ...getByIdQuery,
          },
        })
        .pipe(
          map(response => {
            return OmdbService.transformOmdbShowResponse(
              plainToClass(OmdbShowResponseDto, response.data),
            );
          }),
        )
        .toPromise();

    } catch (e) {
      throw new InternalServerErrorException(
        `Failed fetch data from source: ${e?.message}`,
      );
    }

    return omdbShow;
  }

  public async performSearchRequest(
    searchQuery: OmdbSearchQueryDto,
  ): Promise<OmdbSearchDto[]> {
    let searchResults: OmdbSearchDto[];
    try {
      searchResults = await this.httpService
        .get(OMDB_API_URL, {
          params: {
            apiKey: this.configService.omdbConfig.apiKey,
            ...searchQuery,
          },
        })
        .pipe(
          map(response => {
            return this.transformSearchOmdbShowResponse(
              plainToClass(OmdbSearchResponseDto, response.data),
            );
          }),
        )
        .toPromise();

      return searchResults;
    } catch (e) {
      throw new InternalServerErrorException('Failed fetch data from source');
    }
  }

  private transformSearchOmdbShowResponse(
    searchResponse: OmdbSearchResponseDto,
  ): OmdbSearchDto[] {
    return searchResponse.Search.map(data =>
      classToPlain(data, {
        strategy: 'excludeAll',
      }),
    ).map(plain => plainToClass(OmdbSearchDto, plain));
  }

  private static transformOmdbShowResponse(
    omdbShowResponse: OmdbShowResponseDto,
  ): OmdbShowDto {
    const plain = classToPlain(omdbShowResponse, {
      strategy: 'excludeAll',
    });

    return plainToClass(OmdbShowDto, plain);
  }
}
