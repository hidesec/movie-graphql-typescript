import { forwardRef, Module } from '@nestjs/common';
import { MovieResolver } from '@resolver/movie/movie.resolver';
import { MovieService } from '@services/movie/movie.service';
import { moviesProviders } from '@models/movie/movie.providers';
import { actorMoviesProviders } from '@models/actormovie/actormovie.providers';
import { ActorModule } from '../actor/actor.module';
import { AuthorService } from '@services/author/author.service';
import { authorsProviders } from '@models/author/author.providers';

@Module({
  imports: [forwardRef(() => ActorModule)],
  providers: [
    MovieResolver,
    MovieService,
    ...moviesProviders,
    ...actorMoviesProviders,
    ...actorMoviesProviders,
    ...authorsProviders,
    AuthorService,
  ],
  exports: [MovieService],
})
export class MovieModule {}
