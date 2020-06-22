import { Injectable } from '@nestjs/common';
import AddNoteDto from './dto/add-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import NotesRepository from './notes.repository';
import { Note } from './note.entity';
import { User } from '../user/user.entity';
import UpdateNoteDto from './dto/update-note.dto';

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

  async updateNotes(
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<boolean> {
    return this.notesRepository.updateNote(updateNoteDto, user);
  }
}

export default NotesService;
