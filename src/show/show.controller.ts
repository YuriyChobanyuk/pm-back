import { OmdbShowDto } from './dto/omdb-show.dto';
import { OmdbGetByIdQueryDto } from './dto/omdb-get-by-id-query.dto';
import { OmdbSearchDto } from './dto/omdb-search.dto';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ShowService } from './show.service';
import { API_V1 } from 'src/common/constants';
import { OmdbSearchQueryDto } from './dto/omdb-search-query.dto';

@Controller(`${API_V1}/show`)
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get('/omdb/find')
  findShows(
    @Query(new ValidationPipe({ transform: true })) query: OmdbSearchQueryDto,
  ): Promise<OmdbSearchDto[]> {
    return this.showService.performSearchRequest(query);
  }

  @Get('/omdb')
  getShowByIdFromOmdb(
    @Query(new ValidationPipe({ transform: true })) query: OmdbGetByIdQueryDto,
  ): Promise<OmdbShowDto> {
    return this.showService.performGetShowByIdRequest(query);
  }
}
