import { InputType, Int, PartialType, Field } from '@nestjs/graphql';
import { CreateBookDto } from './create-book.dto';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @Field(() => Int)
  id: number;
}
