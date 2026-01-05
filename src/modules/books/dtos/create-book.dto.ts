import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { Book } from 'generated/prisma/client';

@InputType()
export class CreateBookDto implements Omit<Book, 'id'> {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @Field()
  name: string;

  @IsString({ message: 'description must be a string' })
  @MinLength(10, { message: 'description must be at least 10 characters long' })
  @Field()
  description: string;
}
