import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ACTOR_REPOSITORY, ACTORMOVIE_REPOSITORY } from '@core/constants';
import { Actor } from '@models/actor/actor.entity';
import { CreateActorInput } from '@dto/create-actor.input';
import { ActorMovie } from '@models/actormovie/actormovie.entity';
import { AuthorService } from '@services/author/author.service';
import { Author } from '@models/author/author.entity';
import { Movie } from '@models/movie/movie.entity';
import { UpdateActorInput } from '@dto/update-actor.input';

@Injectable()
export class ActorService {
  constructor(
    @Inject(ACTOR_REPOSITORY) private readonly actorRepository: typeof Actor,
    @Inject(ACTORMOVIE_REPOSITORY)
    private readonly actorMovieRepository: typeof ActorMovie,
    private readonly authorService: AuthorService,
  ) {}

  async create(
    createActorInput: CreateActorInput,
    email: string,
  ): Promise<Actor> {
    try {
      const { movie, ...actor } = createActorInput;
      const getUser = await this.authorService.findOne(email);
      const createActor = await this.actorRepository.create<Actor>(
        Object.assign(actor, { authorId: getUser.id }),
        {
          include: [Movie, Author],
        },
      );

      if (movie) {
        for (let i = 0; movie.length > i; i++) {
          await this.actorMovieRepository.create<ActorMovie>({
            actorId: createActor.id,
            movieId: movie[i],
          });
        }
      }
      return createActor;
    } catch (err) {
      console.log(err);
    }
  }

  async update(updateActorInput: UpdateActorInput): Promise<Actor> {
    try {
      const { id, movie, ...actor } = updateActorInput;
      const updateActor = await this.actorRepository
        .findByPk(id)
        .then(async (result) => {
          return await this.actorRepository
            .update<Actor>(actor, {
              where: { id: id },
            })
            .then(() => {
              return result;
            });
        });

      if (movie) {
        await this.actorMovieRepository.destroy({ where: { actorId: id } });
        for (let i = 0; movie.length > i; i++) {
          await this.actorMovieRepository.create<ActorMovie>({
            actorId: id,
            movieId: movie[i],
          });
        }
      }

      return updateActor;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(): Promise<Actor[]> {
    const actor = await this.actorRepository.findAll<Actor>({
      include: [Movie, Author],
    });
    if (!actor) throw new BadRequestException('Movie Do not exists!');
    return actor;
  }

  async findOne(actorId: number): Promise<Actor> {
    return await this.actorRepository.findByPk<Actor>(actorId, {
      include: [Movie, Author],
    });
  }

  async destroy(actorId: number): Promise<Actor> {
    const deleteActor = await this.actorRepository
      .findByPk(actorId, {
        include: [Movie, Author],
      })
      .then(async (result) => {
        return await this.actorRepository
          .destroy({
            where: { id: actorId },
          })
          .then(() => {
            return result;
          });
      });

    await this.actorMovieRepository.destroy({ where: { actorId: actorId } });

    return deleteActor;
  }
}
