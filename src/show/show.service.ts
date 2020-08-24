import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { ShowRepository } from './show.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AppConfigService } from 'src/app-config/app-config.service';
import { AddShowDto } from './dto/add-show.dto';
import { Show } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    private configService: AppConfigService,
    @InjectRepository(ShowRepository) private showRepository: ShowRepository,
  ) {}


  public async addShow(addShowDto: AddShowDto): Promise<Show> {
    const existingShow = await this.showRepository.getShowByTitle(
      addShowDto.title,
    );

    if (existingShow) {
      throw new ConflictException('Show with this title already exists');
    }

    return this.showRepository.addShow(addShowDto);
  }
}
