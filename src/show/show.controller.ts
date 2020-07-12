import { Controller, Get } from '@nestjs/common';
import { ShowService } from './show.service';
import { API_V1 } from 'src/common/constants';

@Controller(`${API_V1}/show`)
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get('')
  test() {
    return 'test';
  }
}
