import { Test, TestingModule } from '@nestjs/testing';

import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { DatabaseModule } from '../../core/database/database.module';
import { DatabaseService } from '../../core/database/database.service';

const mockDatabaseService = {
  book: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUniqueOrThrow: jest.fn(),
  },
};

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksResolver, BooksService],
      imports: [DatabaseModule],
    })
      .overrideProvider(DatabaseService)
      .useValue(mockDatabaseService)
      .compile();

    resolver = module.get<BooksResolver>(BooksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a book', async () => {
    const id = 1;
    mockDatabaseService.book.create.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await resolver.createBook({
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

    const book = await resolver.updateBook({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    expect(book).toBeDefined();
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

    const book = await resolver.deleteBook(id);

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
    const id = 2;
    mockDatabaseService.book.findUniqueOrThrow.mockResolvedValue({
      id,
      name: 'Test Book',
      description: 'Test Book Description',
    });

    const book = await resolver.getBook(id);

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
});
