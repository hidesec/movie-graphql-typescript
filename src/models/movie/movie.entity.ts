import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ActorMovie } from '@models/actormovie/actormovie.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from '@models/actor/actor.entity';
import { Author } from '@models/author/author.entity';

@Table
@ObjectType()
export class Movie extends Model<Movie> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  @Field(() => Int)
  id: number;

  @ForeignKey(() => Author)
  @Column
  authorId: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  @Field()
  judul: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Field()
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @Field()
  release_date: Date;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  @Field()
  genre: string;

  @Column({
    type: DataType.STRING(40),
    allowNull: false,
  })
  @Field()
  language: string;

  @BelongsToMany(() => Actor, () => ActorMovie)
  @Field(() => [Actor], { nullable: false })
  actor: Array<Actor & { ActorMovie: ActorMovie }>;

  @BelongsTo(() => Author)
  @Field(() => Author, { nullable: false })
  author: Author;
}
