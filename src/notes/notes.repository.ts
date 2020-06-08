import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import AddNoteDto from './dto/addNote.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/user.entity';

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
      return this.find({ user });
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException(e);
    }
  }
}

export default NotesRepository;
