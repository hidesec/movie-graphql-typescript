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
export class UpdateMovieInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  judul: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  release_date: Date;

  @IsNotEmpty()
  @IsString()
  @Field()
  genre: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  language: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
  actor?: Array<number>;
}
