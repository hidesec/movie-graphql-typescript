import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateMovieResponse {
  @Field(() => Int)
  id: number;

  @Field()
  judul: string;

  @Field()
  description: string;

  @Field()
  release_date: Date;

  @Field()
  genre: string;

  @Field()
  language: string;
}
