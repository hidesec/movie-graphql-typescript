import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateActorResponse {
  @Field()
  name: string;

  @Field()
  born: Date;

  @Field()
  born_city: string;

  @Field()
  height: number;
}
