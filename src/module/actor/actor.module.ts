import { forwardRef, Module } from '@nestjs/common';
import { ActorResolver } from '@resolver/actor/actor.resolver';
import { ActorService } from '@services/actor/actor.service';
import { actorsProviders } from '@models/actor/actor.providers';
import { MovieModule } from '../movie/movie.module';
import { moviesProviders } from '@models/movie/movie.providers';
import { authorsProviders } from '@models/author/author.providers';
import { AuthorService } from '@services/author/author.service';
import { actorMoviesProviders } from '@models/actormovie/actormovie.providers';

@Module({
  imports: [forwardRef(() => MovieModule)],
  providers: [
    ActorResolver,
    ActorService,
    ...actorsProviders,
    ...moviesProviders,
    ...actorMoviesProviders,
    ...authorsProviders,
    AuthorService,
  ],
  exports: [ActorService],
})
export class ActorModule {}
