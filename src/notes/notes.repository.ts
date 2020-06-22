import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import AddNoteDto from './dto/add-note.dto';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import UpdateNoteDto from './dto/update-note.dto';

@EntityRepository(Note)
class NotesRepository extends Repository<Note> {
  async addNote(addNoteDto: AddNoteDto, user: User): Promise<Note> {
    try {
      const note = this.create({ ...addNoteDto, user });

      await note.save();

      return note;
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException(new Error(e.massage));
    }
  }

  async getNotes(user: User): Promise<Note[]> {
    try {
      return this.find({ user, active: true });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException(e);
    }
  }

  async updateNote(updateNoteDto: UpdateNoteDto, user: User) {
    const note = await this.update(
      { user, id: updateNoteDto.id },
      updateNoteDto,
    );

    if (!note || !note.affected) {
      throw new BadRequestException('No notes were found');
    }

    return true;
  }
}

export default NotesRepository;
