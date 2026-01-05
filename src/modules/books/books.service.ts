import { Injectable } from '@nestjs/common';

import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

import { DatabaseService } from '../../core/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createBook(dto: CreateBookDto) {
    const book = await this.databaseService.book.create({
      data: dto,
    });

    return book;
  }

  async updateBook(dto: UpdateBookDto) {
    const book = await this.databaseService.book.update({
      where: { id: dto.id },
      data: {
        description: dto?.description,
        name: dto?.name,
      },
    });

    return book;
  }

  async deleteBook(id: number) {
    const book = await this.databaseService.book.delete({
      where: {
        id,
      },
    });

    return book;
  }

  async getBook(id: number) {
    return this.databaseService.book.findUniqueOrThrow({ where: { id } });
  }
}
