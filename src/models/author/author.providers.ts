import { Author } from '@models/author/author.entity';
import { AUTHOR_REPOSITORY } from '@core/constants';

export const authorsProviders = [
  {
    provide: AUTHOR_REPOSITORY,
    useValue: Author,
  },
];
