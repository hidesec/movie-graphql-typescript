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
import { Movie } from '@models/movie/movie.entity';
import { Author } from '@models/author/author.entity';

@Table
@ObjectType()
export class Actor extends Model<Actor> {
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
    type: DataType.STRING(50),
    allowNull: false,
  })
  @Field()
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @Field()
  born: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  @Field()
  born_city: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  @Field(() => Int)
  height: number;

  @BelongsToMany(() => Movie, () => ActorMovie)
  @Field(() => [Movie], { nullable: false })
  movie: Array<Movie & { ActorMovie: ActorMovie }>;

  @BelongsTo(() => Author)
  @Field(() => Author, { nullable: false })
  author: Author;
}
