import { Int, ObjectType, Field } from '@nestjs/graphql';
import { Book as PrismaBook } from '../../../generated/prisma/client';

@ObjectType()
export class Book implements PrismaBook {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}
