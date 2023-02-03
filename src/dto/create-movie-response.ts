import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateMovieResponse {
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
