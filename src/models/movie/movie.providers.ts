import { Movie } from '@models/movie/movie.entity';
import { MOVIE_REPOSITORY } from '@core/constants';

export const moviesProviders = [
  {
    provide: MOVIE_REPOSITORY,
    useValue: Movie,
  },
];
