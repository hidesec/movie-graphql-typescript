import { ActorMovie } from '@models/actormovie/actormovie.entity';
import { ACTORMOVIE_REPOSITORY } from '@core/constants';

export const actorMoviesProviders = [
  {
    provide: ACTORMOVIE_REPOSITORY,
    useValue: ActorMovie,
  },
];
