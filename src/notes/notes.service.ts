import { Injectable } from '@nestjs/common';
import AddNoteDto from './dto/addNote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import NotesRepository from './notes.repository';
import { Note } from './note.entity';
import { User } from '../user/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository) private notesRepository: NotesRepository,
  ) {}

  async addNote(addNoteDto: AddNoteDto, user: User): Promise<Note> {
    return this.notesRepository.addNote(addNoteDto, user);
  }

  async getNotes(user: User): Promise<Note[]> {
    return this.notesRepository.getNotes(user);
  }
}

export default NotesService;
