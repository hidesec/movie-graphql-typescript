import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from '@models/movie/movie.entity';
import { Actor } from '@models/actor/actor.entity';

@Table
@ObjectType()
export class Author extends Model<Author> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  @Field(() => Int)
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  @Field()
  name: string;

  @Column({
    type: DataType.STRING(30),
    unique: true,
    allowNull: false,
  })
  @Field()
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Movie)
  @Field(() => [Movie])
  movie: Movie[];

  @HasMany(() => Actor)
  @Field(() => [Actor])
  actor: Actor[];
}
