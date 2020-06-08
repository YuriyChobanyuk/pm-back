import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotesRepository from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotesRepository])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
