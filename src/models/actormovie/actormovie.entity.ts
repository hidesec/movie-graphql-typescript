import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Movie } from '@models/movie/movie.entity';
import { Actor } from '@models/actor/actor.entity';

@Table
export class ActorMovie extends Model<ActorMovie> {
  // @BelongsTo(() => Movie)
  // movie: Movie;

  @ForeignKey(() => Movie)
  // @PrimaryKey
  @Column
  movieId: number;

  // @BelongsTo(() => Actor)
  // actor: Actor;

  @ForeignKey(() => Actor)
  // @PrimaryKey
  @Column
  actorId: number;
}
