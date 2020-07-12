import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import NotesRepository from './notes.repository';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: 'NotesRepository',
          useClass: NotesRepository,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
