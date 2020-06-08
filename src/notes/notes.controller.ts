import {
  Controller,
  ValidationPipe,
  Body,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import NotesService from './notes.service';
import { Note } from './note.entity';
import AddNoteDto from './dto/addNote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { API_V1 } from 'src/common/constants';

@UseGuards(JwtAuthGuard)
@Controller(`${API_V1}/notes`)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async addNote(
    @Body(ValidationPipe) addNoteDto: AddNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.notesService.addNote(addNoteDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getNotes(@GetUser() user: User) {
    return this.notesService.getNotes(user);
  }
}
