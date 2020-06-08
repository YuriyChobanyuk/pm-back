import { IsEnum, IsString, MaxLength } from 'class-validator';
import NoteTag from '../NoteTag.enum';

class AddNoteDto {
  @IsString()
  @MaxLength(255, {
    message: 'title is too long',
  })
  title: string;

  @IsString()
  text: string;

  @IsEnum(NoteTag, {
    each: true,
  })
  tags: NoteTag[];
}

export default AddNoteDto;
