import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '@models/author/author.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => Author)
  author: Author;
}
