import { GetAllShowsQueryDto } from './dto/get-all-shows.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { API_V1 } from 'src/common/constants';
import { AddShowDto } from './dto/add-show.dto';

@UseGuards(JwtAuthGuard)
@Controller(`${API_V1}/show`)
export class ShowController {
  constructor(private showService: ShowService) {}

  @Post()
  addShow(
    @Body(new ValidationPipe({ transform: true })) addShowDto: AddShowDto,
  ) {
    return this.showService.addShow(addShowDto);
  }

  @Get()
  getAllShows(
    @Query(new ValidationPipe({ transform: true })) query: GetAllShowsQueryDto,
  ) {
    return query;
  }
}
