import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { OmdbSearchQueryDto } from './dto/omdb-search-query.dto';
import { OmdbSearchDto } from './dto/omdb-search.dto';
import { OmdbGetByIdQueryDto } from './dto/omdb-get-by-id-query.dto';
import { OmdbShowDto } from './dto/omdb-show.dto';
import { OmdbService } from './omdb.service';
import { API_V1 } from '../common/constants';

@Controller(`${API_V1}/omdb`)
export class OmdbController {
  constructor(private omdbService: OmdbService) {}

  @Get('/find')
  findShows(
    @Query(new ValidationPipe({ transform: true })) query: OmdbSearchQueryDto,
  ): Promise<OmdbSearchDto[]> {
    return this.omdbService.performSearchRequest(query);
  }

  @Get('/')
  getShowByIdFromOmdb(
    @Query(new ValidationPipe({ transform: true })) query: OmdbGetByIdQueryDto,
  ): Promise<OmdbShowDto> {
    return this.omdbService.performGetShowByIdRequest(query);
  }
}
