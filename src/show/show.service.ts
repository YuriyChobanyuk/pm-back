import { Injectable, HttpService } from '@nestjs/common';
import { OmdbSearchResponseDto } from './dto/omdb-search-response.dto';
import { OmdbSearchDto } from './dto/omdb-search.dto';
import { OMDB_API_URL } from 'src/common/constants';
import { AppConfigService } from 'src/app-config/app-config.service';

@Injectable()
export class ShowService {
  constructor(
    private configService: AppConfigService,
    private httpService: HttpService,
  ) {}
  // public OMDB_API_URL = `http://www.omdbapi.com/?apikey=${this.configService.get(
  //   'OMDB_API_KEY',
  // )}&`;

  searchByTitle(searchQuery: string) {
    this.httpService.get(OMDB_API_URL, {
      params: {
        apiKey: this.configService.omdbConfig.apiKey,
        s: searchQuery,
      },
    });
  }

  transformSearchResponse(
    searchResponse: OmdbSearchResponseDto,
  ): OmdbSearchDto[] {
    return searchResponse.Search.map(data => {
      const searchDto = new OmdbSearchDto();
      searchDto.imdbId = data.imdbID;
      searchDto.title = data.Title;
      searchDto.type = data.Type;
      searchDto.year = data.Year;
      return searchDto;
    });
  }
}
