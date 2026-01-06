import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

import { Book } from '../../common/entities/books.entity';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Roles('ADMIN')
@UseGuards(AuthGuard)
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly bookService: BooksService) {}

  @Query(() => Book, { name: 'book', description: 'Get a book by id' })
  getBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.getBook(id);
  }

  @Query(() => [Book], { name: 'books', description: 'Get all books' })
  getBooks() {
    return this.bookService.getBooks();
  }

  @Mutation(() => Book, {
    name: 'createBook',
    description: 'Create a new book',
  })
  createBook(@Args('createBookInput') createBookInput: CreateBookDto) {
    return this.bookService.createBook(createBookInput);
  }

  @Mutation(() => Book, {
    name: 'updateBook',
    description: 'Update a book',
  })
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookDto) {
    return this.bookService.updateBook(updateBookInput);
  }

  @Mutation(() => Book, {
    name: 'deleteBook',
    description: 'Delete a book',
  })
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.deleteBook(id);
  }
}
