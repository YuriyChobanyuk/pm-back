import { AddShowDto } from './dto/add-show.dto';
import { Show } from './show.entity';
import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { ShowStatus } from './show-status.enum';
import { isPast } from 'date-fns';
import { ShowType } from './show-type.enum';

@EntityRepository(Show)
export class ShowRepository extends Repository<Show> {
  async addShow(addShowDto: AddShowDto): Promise<Show> {
    try {
      const show = this.create({
        ...addShowDto,
        status: this.determineShowStatus(addShowDto),
      });

      await show.save();

      return show;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getShowByTitle(title: string): Promise<Show> {
    try {
      return this.findOne({ title });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private determineShowStatus(addShowDto: AddShowDto): ShowStatus {
    if (isPast(addShowDto.released)) {
      return addShowDto.type === ShowType.SERIES
        ? ShowStatus.ONGOING
        : ShowStatus.FINISHED;
    }
    return ShowStatus.UPCOMING;
  }
}
