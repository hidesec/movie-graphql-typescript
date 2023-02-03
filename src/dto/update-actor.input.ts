import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateActorInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  born: Date;

  @IsNotEmpty()
  @IsString()
  @Field()
  born_city: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  height: number;

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
  movie?: Array<number>;
}
