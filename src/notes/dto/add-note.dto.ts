import { IsString, MaxLength } from 'class-validator';

class AddNoteDto {
  @IsString()
  @MaxLength(255, {
    message: 'title is too long',
  })
  title: string;

  @IsString()
  text: string;

  @IsString({
    each: true,
  })
  tags: string[];
}

export default AddNoteDto;
