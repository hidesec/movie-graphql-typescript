import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
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
