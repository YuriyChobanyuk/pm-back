import {
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsUUID,
} from 'class-validator';

class UpdateNoteDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString({
    each: true,
  })
  tags: string[];
}

export default UpdateNoteDto;
