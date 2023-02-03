import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Movie } from '@models/movie/movie.entity';
import { CreateMovieInput } from '@dto/create-movie.input';
import { ActorMovie } from '@models/actormovie/actormovie.entity';
import { Actor } from '@models/actor/actor.entity';
import { UpdateMovieInput } from '@dto/update-movie.input';
import { Author } from '@models/author/author.entity';
import { ACTORMOVIE_REPOSITORY, MOVIE_REPOSITORY } from '@core/constants';
import { AuthorService } from '@services/author/author.service';

@Injectable()
export class MovieService {
  constructor(
    @Inject(MOVIE_REPOSITORY) private readonly movieRepository: typeof Movie,
    @Inject(ACTORMOVIE_REPOSITORY)
    private readonly actorMovieRepository: typeof ActorMovie,
    private readonly authorService: AuthorService,
  ) {}

  async create(
    createMovieInput: CreateMovieInput,
    email: string,
  ): Promise<Movie> {
    try {
      const { actor, ...movie } = createMovieInput;
      const getUser = await this.authorService.findOne(email);

      const createMovie = await this.movieRepository.create<Movie>(
        Object.assign(movie, { authorId: getUser.id }),
        {
          include: [Actor, Author],
        },
      );

      if (actor) {
        for (let i = 0; actor.length > i; i++) {
          await this.actorMovieRepository.create<ActorMovie>({
            movieId: createMovie.id,
            actorId: actor[i],
          });
        }
      }
      return createMovie;
    } catch (err) {
      console.log(err);
    }
  }

  async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
    try {
      const { id, actor, ...movie } = updateMovieInput;
      const updateMovie = await this.movieRepository
        .findByPk(id)
        .then(async (result) => {
          return await this.movieRepository
            .update<Movie>(movie, {
              where: { id: id },
            })
            .then(() => {
              return result;
            });
        });

      if (actor) {
        await this.actorMovieRepository.destroy({ where: { movieId: id } });
        for (let i = 0; actor.length > i; i++) {
          await this.actorMovieRepository.create<ActorMovie>({
            movieId: id,
            actorId: actor[i],
          });
        }
      }

      return updateMovie;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.findAll<Movie>({
      include: [Actor, Author],
    });
  }

  async findOne(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findByPk<Movie>(movieId, {
      include: [Actor, Author],
    });

    if (!movie) throw new BadRequestException('Movie Do not exists!');
    return movie;
  }

  async destroy(movieId: number): Promise<Movie> {
    const deleteMovie = await this.movieRepository
      .findByPk(movieId, {
        include: [Actor, Author],
      })
      .then(async (result) => {
        return await this.movieRepository
          .destroy({
            where: { id: movieId },
          })
          .then(() => {
            return result;
          });
      });

    await this.actorMovieRepository.destroy({ where: { movieId: movieId } });

    return deleteMovie;
  }
}
