import { Test, TestingModule } from '@nestjs/testing';

import { BooksService } from './books.service';
import { DatabaseService } from '../../core/database/database.service';
import { DatabaseModule } from '../../core/database/database.module';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

const mockDatabaseService = {
  book: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUniqueOrThrow: jest.fn(),
  },
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
      imports: [DatabaseModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    service = module.get<BooksService>(BooksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const id = 1;
    mockDatabaseService.book.create.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await service.createBook({
      name: 'Test Book',
      description: 'Test Book Description',
    });

    expect(book).toBeDefined();
    expect(book).toEqual({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });
    expect(mockDatabaseService.book.create).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.book.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Book',
        description: 'Test Book Description',
      },
    });
  });

  it('should update a book', async () => {
    const id = 1;
    mockDatabaseService.book.update.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await service.updateBook({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    expect(book).toBeDefined();
    expect(book).toEqual({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });
    expect(mockDatabaseService.book.update).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.book.update).toHaveBeenCalledWith({
      where: {
        id,
      },
      data: {
        name: 'Test Book',
        description: 'Test Book Description',
      },
    });
  });

  it('should delete a book', async () => {
    const id = 1;
    mockDatabaseService.book.delete.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await service.deleteBook(id);

    expect(book).toBeDefined();
    expect(book).toEqual({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });
    expect(mockDatabaseService.book.delete).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.book.delete).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should get a book', async () => {
    const id = 1;
    mockDatabaseService.book.findUniqueOrThrow.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await service.getBook(id);

    expect(book).toBeDefined();
    expect(book).toEqual({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });
    expect(mockDatabaseService.book.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.book.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });

  it('should throw an error if book does not exist', async () => {
    const id = 1;
    mockDatabaseService.book.findUniqueOrThrow.mockRejectedValue(
      new PrismaClientKnownRequestError('book does not exist', {
        code: 'P2025',
        clientVersion: '7.0.0',
      }),
    );

    await expect(service.getBook(id)).rejects.toThrow(
      PrismaClientKnownRequestError,
    );

    expect(mockDatabaseService.book.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(mockDatabaseService.book.findUniqueOrThrow).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });
});
