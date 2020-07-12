import { OmdbShowResponseDto } from './dto/omdb-show-response.dto';
import { OmdbGetByIdQueryDto } from './dto/omdb-get-by-id-query.dto';
import { OmdbSearchQueryDto } from './dto/omdb-search-query.dto';
import {
  Injectable,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { OmdbSearchResponseDto } from './dto/omdb-search-response.dto';
import { OmdbSearchDto } from './dto/omdb-search.dto';
import { OMDB_API_URL } from 'src/common/constants';
import { AppConfigService } from 'src/app-config/app-config.service';
import { map } from 'rxjs/operators';
import { OmdbShowDto } from './dto/omdb-show.dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class ShowService {
  constructor(
    private configService: AppConfigService,
    private httpService: HttpService,
  ) {}

  async performSearchRequest(
    searchQuery: OmdbSearchQueryDto,
  ): Promise<OmdbSearchDto[]> {
    try {
      const searchResults = await this.httpService
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

  async performGetShowByIdRequest(
    getByIdQuery: OmdbGetByIdQueryDto,
  ): Promise<OmdbShowDto> {
    try {
      const omdbShow = await this.httpService
        .get(OMDB_API_URL, {
          params: {
            apiKey: this.configService.omdbConfig.apiKey,
            ...getByIdQuery,
          },
        })
        .pipe(
          map(response => {
            return this.transformOmdbShowResponse(
              plainToClass(OmdbShowResponseDto, response.data),
            );
          }),
        )
        .toPromise();

      return omdbShow;
    } catch (e) {
      throw new InternalServerErrorException(
        `Failed fetch data from source: ${e}`,
      );
    }
  }

  transformSearchOmdbShowResponse(
    searchResponse: OmdbSearchResponseDto,
  ): OmdbSearchDto[] {
    return searchResponse.Search.map(data =>
      classToPlain(data, {
        strategy: 'excludeAll',
      }),
    ).map(plain => plainToClass(OmdbSearchDto, plain));
  }

  transformOmdbShowResponse(
    omdbShowResponse: OmdbShowResponseDto,
  ): OmdbShowDto {
    const plain = classToPlain(omdbShowResponse, {
      strategy: 'excludeAll',
    });

    return plainToClass(OmdbShowDto, plain);
  }
}
